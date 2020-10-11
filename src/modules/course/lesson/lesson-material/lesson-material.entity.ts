import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { Lesson } from "../lesson.entity";
import { TextContent } from "./text-content/text-content.entity";
import { Test } from "./test/test.entity";

import { LessonType } from "../../../../common/enums/lesson-type.enum";
import { Media } from "../../../../modules/media/media.entity";

@Index("lesson_material_pk", ["id"], { unique: true })
@Entity({ name: 'lesson_material' })
export class LessonMaterial {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: LessonType })
    type: LessonType;

    @ManyToOne(
        () => Lesson,
        lesson => lesson.lessonMaterials,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    )
    lesson: Lesson;

    @Column()
    lessonId: number;

    @OneToOne(
        () => Media,
        media => media.lessonMaterial,
        { onDelete: "SET NULL" }
    )
    @JoinColumn()
    media: Media;

    @Column()
    mediaId: number;

    @OneToOne(
        () => Test,
        test => test.lessonMaterial,
        { onDelete: "SET NULL" }
    )
    @JoinColumn()
    test: Test;

    @Column()
    testId: number;

    @OneToOne(
        () => TextContent,
        textContent => textContent.lessonMaterial,
        { onDelete: "SET NULL" }
    )
    @JoinColumn()
    textContent: TextContent;

    @Column()
    textContentId: number;
}
