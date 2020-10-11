import {
    Column,
    Entity,
    Index,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { LessonMaterial } from "../lesson-material.entity";
import { TestOption } from "./option/test-option.entity";

@Index("test_pk", ["id"], { unique: true })
@Entity({ name: 'test' })
export class Test {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    task: string;

    @Column({ type: 'double precision' })
    score: number;

    @OneToOne(
        () => LessonMaterial,
        lessonMaterial => lessonMaterial.test
    )
    lessonMaterial: LessonMaterial;

    @OneToMany(
        () => TestOption,
        testOption => testOption.test
    )
    testOptions: TestOption[];
}
