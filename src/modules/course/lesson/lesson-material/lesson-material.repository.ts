import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";

import { LessonMaterial } from "./lesson-material.entity";

@EntityRepository(LessonMaterial)
export class LessonMaterialRepository extends BaseRepository<LessonMaterial> {

    public async findByIdWithRelations(id: number): Promise<LessonMaterial> {
        return this.createQueryBuilder('lessonMaterials')
            .leftJoinAndSelect('lessonMaterials.media', 'media')
            .leftJoinAndSelect('lessonMaterials.textContent', 'textContent')
            .leftJoinAndSelect('lessonMaterials.test', 'test')
            .where('lessonMaterials.id = :id', { id })
            .getOne();
    }
}