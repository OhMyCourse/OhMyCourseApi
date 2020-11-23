import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LessonModule } from "../course/lesson/lesson.module";
import { UserCourseController } from "./user-course.controller";
import { UserCourseRepository } from "./user-course.repository";
import { UserCourseService } from "./user-course.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserCourseRepository]),
        LessonModule
    ],
    providers: [UserCourseService],
    exports: [UserCourseService],
    controllers: [UserCourseController]
})
export class UserCourseModule {}