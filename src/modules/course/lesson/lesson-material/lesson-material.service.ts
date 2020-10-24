import { Injectable } from "@nestjs/common";
import { from } from "rxjs";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { CreateLessonMaterialRequestDto } from "./dto/request/create-lesson-material.request-dto";

import { LessonMaterial } from "./lesson-material.entity";

import { LessonMaterialRepository } from "./lesson-material.repository";

import { LessonMaterialNotFoundException } from "../../../../exceptions/not-found/lesson-material-not-found.exception";

@Injectable()
export class LessonMaterialService {

    constructor(private readonly lessonMaterialRepository: LessonMaterialRepository) { }

    public async getByIdWithRelationsOrFail(id: number): Promise<LessonMaterial> {
        const lessonMaterial = await this.lessonMaterialRepository.findByIdWithRelations(id);
        if (!lessonMaterial) {
            throw new LessonMaterialNotFoundException();
        }
        return lessonMaterial;
    }

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