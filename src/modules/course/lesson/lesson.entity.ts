import {
    Column,
    Entity,
    Index,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

import { Course } from "../course.entity";
import { LessonMaterial } from "./lesson-material/lesson-material.entity";

@Index("lesson_pk", ["id"], { unique: true })
@Entity({ name: 'lesson' })
export class Lesson {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @ManyToOne(
        () => Course,
        course => course.lessons
    )
    course: Course;

    @Column()
    courseId: number;

    @OneToMany(
        () => LessonMaterial,
        lessonMaterial => lessonMaterial.lesson
    )
    lessonMaterials: LessonMaterial[];
}
