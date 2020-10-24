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

    public async findByIdWithMediaAndLessons(id: number): Promise<Course> {
        return this.createQueryBuilder('course')
            .leftJoinAndSelect('course.media', 'media')
            .leftJoinAndSelect('course.lessons', 'lessons')
            .where('course.id = :id', { id })
            .getOne();
    }

    public async findByIdWithLessons(id: number): Promise<Course> {
        return this.createQueryBuilder('course')
            .leftJoinAndSelect('course.lessons', 'lessons')
            .where('course.id = :id', { id })
            .getOne();
    }

    public async findAllWithMedia(): Promise<Course[]> {
        return this.createQueryBuilder('course')
            .leftJoinAndSelect('course.media', 'media')
            .getMany();
    }
}