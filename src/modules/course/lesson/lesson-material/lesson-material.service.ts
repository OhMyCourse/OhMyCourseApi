import { Injectable } from "@nestjs/common";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { CreateLessonMaterialRequestDto } from "./dto/request/create-lesson-material.request-dto";

import { LessonMaterial } from "./lesson-material.entity";

import { LessonMaterialRepository } from "./lesson-material.repository";

@Injectable()
export class LessonMaterialService {

    constructor(private readonly lessonMaterialRepository: LessonMaterialRepository) { }

    @Transactional()
    public async createMany(lessonMaterials: LessonMaterial[]): Promise<LessonMaterial[]> {
        return this.lessonMaterialRepository.save(lessonMaterials);
    }

    public createEntity(createDto: CreateLessonMaterialRequestDto, lessonId: number): LessonMaterial {
        return this.lessonMaterialRepository.create({
            type: createDto.type,
            lessonId: lessonId
        });
    }
}