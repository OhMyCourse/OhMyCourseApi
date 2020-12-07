import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Transactional } from "typeorm-transactional-cls-hooked";
import { UserCourseStatus } from "../../common/enums/user-course-status.enum";
import { CourseRepository } from "../course/course.repository";
import { Lesson } from "../course/lesson/lesson.entity";
import { LessonService } from "../course/lesson/lesson.service";
import { UserService } from "../user/user.service";
import { IncrementScoreRequestDto } from "./dto/increment-score.request-dto";
import { SubscribeUserRequestDto } from "./dto/subscribe-user.request-dto";
import { UserCourse } from "./user-course.entity";
import { UserCourseRepository } from "./user-course.repository";

@Injectable()
export class UserCourseService {

    constructor(
        private readonly userCourseRepository: UserCourseRepository,
        private readonly courseRepository: CourseRepository,
        private readonly lessonService: LessonService
    ) { }

    public async getUserCourses(userId: number): Promise<[UserCourse[], number[]]> {
        const courses = await this.userCourseRepository.createQueryBuilder('userCourse')
            .leftJoinAndSelect('userCourse.passedLessons', 'passedLessons')
            .leftJoinAndSelect('userCourse.course', 'course')
            .leftJoinAndSelect('userCourse.user', 'user')
            .leftJoinAndSelect('course.lessons', 'lessons')
            .where('userCourse.userId = :userId', { userId: userId })
            .getMany();

        const maxScores = await Promise.all(courses.map(course => Promise.resolve(
            this.courseRepository.findMaxScore(course.courseId)
        )));

        return [courses, maxScores];
    }

    public async subscribe(subscribeDto: SubscribeUserRequestDto): Promise<UserCourse> {
        const oldUserCourse = await this.userCourseRepository.findOne({
            userId: subscribeDto.userId,
            courseId: subscribeDto.courseId
        });

        if (oldUserCourse) {
            throw new ConflictException('User have already subscribed!');
        }
        const userCourse = this.userCourseRepository.create(subscribeDto);

        return this.userCourseRepository.save(userCourse);
    }

    public async unsubscribe(subscribeDto: SubscribeUserRequestDto): Promise<void> {
        const oldUserCourse = await this.userCourseRepository.findOne({
            userId: subscribeDto.userId,
            courseId: subscribeDto.courseId
        });

        if (!oldUserCourse) {
            throw new ConflictException("User isn't subscribed!");
        }
        await this.userCourseRepository.delete({
            userId: subscribeDto.userId,
            courseId: subscribeDto.courseId
        });
    }

    @Transactional()
    public async passLesson(lessonId: number, userId: number): Promise<UserCourse> {
        const lesson = await this.lessonService.getByIdWithMaterialsOrFail(lessonId);
        const userCourse = await this.userCourseRepository.findOne({
            userId: userId,
            courseId: lesson.courseId
        },
            {
                relations: ['passedLessons', 'user', 'course']
            }
        );

        userCourse.passedLessons = userCourse.passedLessons ?
            [...userCourse.passedLessons, lesson]
            : [lesson];

        return this.userCourseRepository.save(userCourse);
    }

    public async completeCourse(courseId: number, userId: number): Promise<UserCourse> {
        const userCourse = await this.userCourseRepository.findOne({
            userId: userId,
            courseId: courseId
        });

        if (userCourse.status !== UserCourseStatus.Started) {
            throw new ConflictException('Status has to be started!');
        }
        userCourse.status = UserCourseStatus.Finished;

        return this.userCourseRepository.save(userCourse);
    }

    public async incrementScore(incrementScoreDto: IncrementScoreRequestDto): Promise<void> {
        const userCourse = await this.userCourseRepository.findOne({
            courseId: incrementScoreDto.courseId,
            userId: incrementScoreDto.userId
        });
        if (!userCourse) {
            throw new NotFoundException('Subscription not found!');
        }

        userCourse.score += incrementScoreDto.score;
        await this.userCourseRepository.save(userCourse);
    }
}