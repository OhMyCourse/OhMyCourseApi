import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { CourseAlreadyExistException } from "../../exceptions/conflict/course-already-exist.exception";
import { CourseNotFoundException } from "../../exceptions/not-found/course-not-found.exception";

import { MediaService } from "../media/media.service";

import { Course } from "./course.entity";
import { CourseRepository } from "./course.repository";

import { CreateCourseRequestDto } from "./dto/request/create-course.request-dto";
import { UpdateCourseRequestDto } from "./dto/request/update-course.request-dto";
import { LessonService } from "./lesson/lesson.service";

@Injectable()
export class CourseService {

    constructor(
        private readonly courseRepository: CourseRepository,
        @Inject(forwardRef(() => LessonService))
        private readonly lessonService: LessonService,
        private readonly mediaService: MediaService
    ) { }

    public async getAllWithMedia(): Promise<Course[]> {
        return this.courseRepository.findAllWithMedia();
    }

    public async getByIdWithMediaAndLessonsOrFail(id: number): Promise<Course> {
        const course = await this.courseRepository.findByIdWithMediaAndLessons(id);
        if (!course) {
            throw new CourseNotFoundException();
        }
        return course;
    }

    public async getByIdOrFail(id: number): Promise<Course> {
        const course = await this.courseRepository.findOne(id);
        if (!course) {
            throw new CourseNotFoundException();
        }
        return course;
    }

    public async getByIdWithLessonsOrFail(id: number): Promise<Course> {
        const course = await this.courseRepository.findByIdWithLessons(id);
        if (!course) {
            throw new CourseNotFoundException();
        }
        return course;
    }

    public async getUserCreatedCourses(userId: number): Promise<Course[]> {
        return this.courseRepository.find({ userId: userId });
    }

    public async create(createDto: CreateCourseRequestDto, userId: number): Promise<Course> {
        const oldCourse = await this.courseRepository.findByName(createDto.name);
        if (oldCourse) {
            throw new CourseAlreadyExistException();
        }

        await this.mediaService.getUnboundByIdOrFail(createDto.mediaId);

        const course = this.courseRepository.create({ ...createDto, userId: userId });

        return this.courseRepository.save(course);
    }

    public async update(updateDto: UpdateCourseRequestDto, id: number): Promise<Course> {
        if (updateDto.mediaId) {
            await this.mediaService.getUnboundByIdOrFail(updateDto.mediaId);
        }

        const course = await this.getByIdOrFail(id);
        const mergedCourse = this.courseRepository.merge(course, updateDto);

        return this.courseRepository.save(mergedCourse);
    }

    @Transactional()
    public async deleteById(id: number): Promise<void> {
        const course = await this.getByIdWithLessonsOrFail(id);
        const lessonIds = course.lessons.map(lesson => lesson.id);

        await this.lessonService.deleteByIds(lessonIds);

        await this.courseRepository.delete(id);
    }
}