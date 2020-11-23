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
import { TestOption } from "../course/lesson/lesson-material/test/option/test-option.entity";
import { User } from "../user/user.entity";

import { UserCourseStatus } from "../../common/enums/user-course-status.enum";
import { Lesson } from "../course/lesson/lesson.entity";

@Index("user_course_pk", ["id"], { unique: true })
@Entity({ name: 'user_course' })
export class UserCourse {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: UserCourseStatus, default: UserCourseStatus.Started })
    status: UserCourseStatus;

    @Column({ type: 'double precision', default: 0.0 })
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

    @Column()
    courseId: number;

    @ManyToOne(
        () => User,
        users => users.userCourses
    )
    user: User;

    @Column()
    userId: number;

    @ManyToMany(() => TestOption)
    @JoinTable()
    testOptions: TestOption[];
}
