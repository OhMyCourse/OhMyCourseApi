import {
    Column,
    Entity,
    Index,
    PrimaryGeneratedColumn,
} from "typeorm";

@Index("course_category_pk", ["id"], { unique: true })
@Index("course_category_name_uindex", ["name"], { unique: true })
@Entity({ name: 'category' })
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;
}
