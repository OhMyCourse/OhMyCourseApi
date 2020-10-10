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
@Entity("lesson", { schema: "public" })
export class Lesson {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @ManyToOne(
        () => Course,
        course => course.lessons
    )
    course: Course;

    @OneToMany(
        () => LessonMaterial,
        lessonMaterial => lessonMaterial.lesson
    )
    lessonMaterials: LessonMaterial[];
}
