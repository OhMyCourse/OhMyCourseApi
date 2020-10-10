import {
    Column,
    Entity,
    Index,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { UserCourse } from "../user-course/user-course.entity";

@Index("certificate_file_name_uindex", ["fileName"], { unique: true })
@Index("certificate_pk", ["id"], { unique: true })
@Entity({ name: 'certificate' })
export class Certificate {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    fileName: string;

    @OneToOne(
        () => UserCourse,
        userCourse => userCourse.certificate
    )
    @JoinColumn()
    userCourse: UserCourse;
}
