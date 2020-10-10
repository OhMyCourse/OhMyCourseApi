import {
    Column,
    Entity,
    Index,
    PrimaryGeneratedColumn,
} from "typeorm";

@Index("course_category_pk", ["id"], { unique: true })
@Index("course_category_name_uindex", ["name"], { unique: true })
@Entity("category", { schema: "public" })
export class Category {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;
}
