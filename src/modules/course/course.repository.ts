import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";

import { Course } from "./course.entity";

@EntityRepository(Course)
export class CourseRepository extends BaseRepository<Course> {

    public async findByName(name: string) {
        return this.createQueryBuilder('course')
            .where('course.name = :name', { name })
            .getOne();
    }

    public async findByIdWithMedia(id: number): Promise<Course> {
        return this.createQueryBuilder('course')
            .leftJoinAndSelect('course.media', 'media')
            .where('course.id = :id', { id })
            .getOne();
    }
}