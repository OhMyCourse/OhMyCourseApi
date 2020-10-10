import {
    Column,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { Test } from "../test.entity";

@Index("test_option_pk", ["id"], { unique: true })
@Entity({ name: 'test_option' })
export class TestOption {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'boolean' })
    isRight: boolean;

    @ManyToOne(
        () => Test,
        test => test.testOptions,
        {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }
    )
    test: Test;
}
