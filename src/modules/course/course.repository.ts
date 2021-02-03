import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { CourseCategory } from "../../common/enums/course-category.enum";

import { Course } from "./course.entity";
import { FilterCourseRequestDto } from "./dto/request/filter-course.request-dto";

@EntityRepository(Course)
export class CourseRepository extends BaseRepository<Course> {

    public async findByName(name: string) {
        return this.createQueryBuilder('course')
            .where('course.name = :name', { name })
            .getOne();
    }

    public async findMaxScore(id: number): Promise<number> {
        const response = await this.createQueryBuilder('course')
            .leftJoin('course.lessons', 'lessons')
            .leftJoin('lessons.lessonMaterials', 'lessonMaterials')
            .leftJoin('lessonMaterials.test', 'test')
            .select('COALESCE(SUM(test.score), 0) AS max_score')
            .where('course.id = :id', { id })
            .getRawOne();

            return response['max_score'];
    }

    public async filter(filterCourseDto: FilterCourseRequestDto) {
        const queryBuilder = this.createQueryBuilder('course')
            .leftJoinAndSelect('course.media', 'media')
            .leftJoinAndSelect('course.lessons', 'lessons')
            .leftJoinAndSelect('lessons.lessonMaterials', 'lessonMaterials')
            .leftJoinAndSelect('lessonMaterials.media', 'materialMedia')
            .leftJoinAndSelect('lessonMaterials.textContent', 'textContent')
            .leftJoinAndSelect('lessonMaterials.test', 'test')

        if (filterCourseDto.name) {
            queryBuilder.where('course.name LIKE :name', { name: `%${filterCourseDto.name}%` })
        }

        if (filterCourseDto.name && filterCourseDto.category) {
            queryBuilder.andWhere('course.category = :category', { category: filterCourseDto.category })
        } else if (filterCourseDto.category) {
            queryBuilder.where('course.category = :category', { category: filterCourseDto.category })
        }

        return queryBuilder.getMany();
    }

    public async findByIdWithMediaAndLessons(id: number): Promise<Course> {
        return this.createQueryBuilder('course')
            .leftJoinAndSelect('course.media', 'media')
            .leftJoinAndSelect('course.lessons', 'lessons')
            .leftJoinAndSelect('lessons.lessonMaterials', 'lessonMaterials')
            .leftJoinAndSelect('lessonMaterials.media', 'materialMedia')
            .leftJoinAndSelect('lessonMaterials.textContent', 'textContent')
            .leftJoinAndSelect('lessonMaterials.test', 'test')
            .where('course.id = :id', { id })
            .orderBy('lessonMaterials.order', 'ASC')
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
            .leftJoinAndSelect('course.lessons', 'lessons')
            .leftJoinAndSelect('lessons.lessonMaterials', 'lessonMaterials')
            .leftJoinAndSelect('lessonMaterials.media', 'materialMedia')
            .leftJoinAndSelect('lessonMaterials.textContent', 'textContent')
            .leftJoinAndSelect('lessonMaterials.test', 'test')
            .orderBy('lessonMaterials.order', 'ASC')
            .getMany();
    }
}