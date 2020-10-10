import {
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { Certificate } from "../certificate/certificate.entity";
import { Course } from "../course/course.entity";
import { TestOption } from "../test/option/test-option.entity";
import { User } from "../user/user.entity";

import { UserCourseStatus } from "../../common/enums/user-course-status.enum";

@Index("user_course_pk", ["id"], { unique: true })
@Entity("user_course", { schema: "public" })
export class UserCourse {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'enum', enum: UserCourseStatus, default: UserCourseStatus.Started })
    status: UserCourseStatus;

    @Column({ type: 'double precision', default: 0 })
    score: number;

    @OneToOne(
        () => Certificate,
        certificate => certificate.userCourse
    )
    certificate: Certificate;

    @ManyToOne(
        () => Course,
        course => course.userCourses
    )
    course: Course;

    @ManyToOne(
        () => User,
        users => users.userCourses
    )
    user: User;

    @ManyToMany(() => TestOption)
    @JoinTable()
    testOptions: TestOption[];
}
