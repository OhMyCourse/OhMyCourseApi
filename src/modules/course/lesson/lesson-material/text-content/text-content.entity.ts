import {
    Column,
    Entity,
    Index,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { LessonMaterial } from "../lesson-material.entity";

@Index("text_content_pk", ["id"], { unique: true })
@Entity({ name: 'text_content' })
export class TextContent {

    @PrimaryGeneratedColumn()
    id: number;

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