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

    public async filter(filterCourseDto: FilterCourseRequestDto) {
        return this.createQueryBuilder('course')
            .leftJoinAndSelect('course.media', 'media')
            .leftJoinAndSelect('course.lessons', 'lessons')
            .leftJoinAndSelect('lessons.lessonMaterials', 'lessonMaterials')
            .leftJoinAndSelect('lessonMaterials.media', 'materialMedia')
            .leftJoinAndSelect('lessonMaterials.textContent', 'textContent')
            .leftJoinAndSelect('lessonMaterials.test', 'test')
            .where('course.name = :name', { name: filterCourseDto.name })
            .andWhere('course.category = :category', { category: filterCourseDto.category })
            .getMany();
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