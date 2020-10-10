import {
    Column,
    Entity,
    Index,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { LessonMaterial } from "../course/lesson/lesson-material/lesson-material.entity";

@Index("text_content_pk", ["id"], { unique: true })
@Entity("text_content", { schema: "public" })
export class TextContent {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'text' })
    text: string;

    @Column({ type: 'boolean', default: false })
    isTip: boolean;

    @OneToOne(
        () => LessonMaterial,
        lessonMaterial => lessonMaterial.textContent
    )
    lessonMaterial: LessonMaterial[];
}