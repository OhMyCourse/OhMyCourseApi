import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";

import { LessonRepository } from "./lesson.repository";
import { LessonService } from "./lesson.service";
import { LessonController } from "./lesson.controller";

import { LessonMaterialModule } from "./lesson-material/lesson-material.module";
import { CourseModule } from "../course.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([LessonRepository]),
        LessonMaterialModule,
        CourseModule
    ],
    providers: [LessonService],
    controllers: [LessonController],
    exports: [LessonService]
})
export class LessonModule { }