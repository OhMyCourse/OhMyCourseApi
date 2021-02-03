import {
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { CourseCategory } from "../../common/enums/course-category.enum";

import { Category } from "../category/category.entity";
import { Media } from "../media/media.entity";
import { UserCourse } from "../user-course/user-course.entity";
import { User } from "../user/user.entity";
import { Lesson } from "./lesson/lesson.entity";

@Index("course_pk", ["id"], { unique: true })
@Index("course_name_uindex", ["name"], { unique: true })
@Entity({ name: 'course' })
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'enum', enum: CourseCategory, default: CourseCategory.Engineering })
    category: CourseCategory;

    @ManyToOne(
        () => User,
        user => user.createdCourses
    )
    user: User;

    @Column()
    userId: number;

    @OneToOne(
        () => Media,
        media => media.course
    )
    @JoinColumn()
    media: Media;

    @Column()
    mediaId: number;

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];

    @OneToMany(
        () => Lesson,
        lesson => lesson.course
    )
    lessons: Lesson[];

    @OneToMany(
        () => UserCourse,
        userCourse => userCourse.course
    )
    userCourses: UserCourse[];
}
