import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { UserCourse } from "../user-course/user-course.entity";

@Index("certificate_pk", ["id"], { unique: true })
@Entity({ name: 'certificate' })
export class Certificate {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    date: Date;

    @Column()
    userCourseId: number;

    @OneToOne(
        () => UserCourse,
        userCourse => userCourse.certificate
    )
    @JoinColumn()
    userCourse: UserCourse;
}
