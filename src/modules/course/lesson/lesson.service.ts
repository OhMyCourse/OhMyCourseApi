import { Injectable } from "@nestjs/common";

import { Transactional } from "typeorm-transactional-cls-hooked";

import { CourseService } from "../course.service";

import { CreateLessonRequestDto } from "./dto/request/create-lesson.request-dto";
import { LessonMaterialFacade } from "./lesson-material/lesson-material.facade";

import { Lesson } from "./lesson.entity";

import { LessonRepository } from "./lesson.repository";

import { LessonNotFoundException } from "../../../exceptions/not-found/lesson-not-found.exception";

@Injectable()
export class LessonService {

    constructor(
        private readonly lessonRepository: LessonRepository,
        private readonly lessonMaterialFacade: LessonMaterialFacade,
        private readonly courseService: CourseService
    ) { }

    public async getByIdWithMaterialsOrFail(id: number): Promise<Lesson> {
        const lesson = await this.lessonRepository.findByIdWithMaterials(id);
        if (!lesson) {
            throw new LessonNotFoundException();
        }
        return lesson;
    }

    @Transactional()
    public async create(createDto: CreateLessonRequestDto): Promise<Lesson> {
        await this.courseService.getByIdOrFail(createDto.courseId);

        const lesson = this.lessonRepository.create({
            title: createDto.title,
            courseId: createDto.courseId
        });
        const savedLesson = await this.lessonRepository.save(lesson);

        const lessonMaterials = await this.lessonMaterialFacade.createMany(
            createDto.lessonMaterials,
            lesson.id
        );
        savedLesson.lessonMaterials = lessonMaterials;

        return savedLesson;
    }
}