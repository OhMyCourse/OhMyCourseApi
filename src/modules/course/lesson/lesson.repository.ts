import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";

import { Lesson } from "./lesson.entity";

@EntityRepository(Lesson)
export class LessonRepository extends BaseRepository<Lesson> {

    public async findByIdWithMaterials(id: number): Promise<Lesson> {
        return this.createQueryBuilder('lesson')
            .leftJoinAndSelect('lesson.lessonMaterials', 'lessonMaterials')
            .leftJoinAndSelect('lessonMaterials.media', 'media')
            .leftJoinAndSelect('lessonMaterials.textContent', 'textContent')
            .leftJoinAndSelect('lessonMaterials.test', 'test')
            .leftJoinAndSelect('test.testOptions', 'testOptions')
            .where('lesson.id = :id', { id })
            .getOne();
    }
}