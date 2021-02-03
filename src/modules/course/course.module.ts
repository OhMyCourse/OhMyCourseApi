import { forwardRef, Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";

import { MediaModule } from "../media/media.module";

import { CourseController } from "./course.controller";
import { CourseRepository } from "./course.repository";
import { CourseService } from "./course.service";

import { LessonModule } from "./lesson/lesson.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([CourseRepository]),
        MediaModule,
        forwardRef(() => LessonModule)
    ],
    providers: [CourseService],
    controllers: [CourseController],
    exports: [CourseService]
})
export class CourseModule { }