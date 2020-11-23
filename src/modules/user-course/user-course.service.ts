import { ConflictException, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { SubscribeUserRequestDto } from "./dto/subscribe-user.request-dto";
import { UserCourse } from "./user-course.entity";
import { UserCourseRepository } from "./user-course.repository";

@Injectable()
export class UserCourseService {

    constructor(private readonly userCourseRepository: UserCourseRepository) { }

    public async getUserCourses(userId: number) {
        return this.userCourseRepository.find({ userId: userId });
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
}