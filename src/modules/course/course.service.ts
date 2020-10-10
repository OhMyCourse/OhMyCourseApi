import { Injectable } from "@nestjs/common";

import { CourseAlreadyExistException } from "../../exceptions/conflict/course-already-exist.exception";
import { CourseNotFoundException } from "../../exceptions/not-found/course-not-found.exception";

import { MediaService } from "../media/media.service";

import { Course } from "./course.entity";
import { CourseRepository } from "./course.repository";

import { CreateCourseRequestDto } from "./dto/request/create-course.request-dto";
import { UpdateCourseRequestDto } from "./dto/request/update-course.request-dto";

@Injectable()
export class CourseService {

    constructor(
        private readonly courseRepository: CourseRepository,
        private readonly mediaService: MediaService
    ) { }

    public async getByIdWithMediaOrFail(id: number): Promise<Course> {
        const course = await this.courseRepository.findByIdWithMedia(id);
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


    public async create(createDto: CreateCourseRequestDto): Promise<Course> {
        const oldCourse = await this.courseRepository.findByName(createDto.name);
        if (oldCourse) {
            throw new CourseAlreadyExistException();
        }

        await this.mediaService.getUnboundByIdOrFail(createDto.mediaId);

        const course = this.courseRepository.create(createDto);
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
}