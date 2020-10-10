import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { Media } from "../media/media.entity";
import { UserCourse } from "../user-course/user-course.entity";

@Index("users_email_uindex", ["email"], { unique: true })
@Index("users_pk", ["id"], { unique: true })
@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    surname: string;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: Date })
    birthday: Date;

    @Column({ type: 'text', nullable: true })
    bio?: string;

    @Column({ unique: true })
    mediaId: string;

    @OneToMany(
        () => UserCourse,
        userCourse => userCourse.user
    )
    userCourses: UserCourse[];

    @OneToOne(
        () => Media,
        media => media.user
    )
    @JoinColumn()
    media: Media;
}