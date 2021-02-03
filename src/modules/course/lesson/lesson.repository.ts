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
            .orderBy('lessonMaterials.order', 'ASC')
            .getOne();
    }

    public async findMaxScore(id: number): Promise<number> {
        const response = await this.createQueryBuilder('lesson')
            .leftJoin('lesson.lessonMaterials', 'lessonMaterials')
            .leftJoin('lessonMaterials.test', 'test')
            .select('COALESCE(SUM(test.score), 0) AS max_score')
            .where('lesson.id = :id', { id })
            .getRawOne();

        return response['max_score'];
    }

    public async findUserMaxScore(lessonId: number, userId: number): Promise<number> {
        const response = await this.createQueryBuilder('lessons')
            .leftJoin('lessons.lessonMaterials', 'lessonMaterials')
            .leftJoin('lessonMaterials.test', 'test')
            .leftJoin('lessons.course', 'course')
            .leftJoin('course.userCourses', 'userCourses')
            .select('COALESCE(SUM(test.score), 0) AS max_score')
            .where('lessons.id = :lessonId', { lessonId })
            .andWhere('userCourses.userId = :userId', { userId })
            .getRawOne();

        return response['max_score'];
    }
}