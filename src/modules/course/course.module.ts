import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";

import { MediaModule } from "../media/media.module";

import { CourseController } from "./course.controller";
import { CourseRepository } from "./course.repository";
import { CourseService } from "./course.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([CourseRepository]),
        MediaModule
    ],
    providers: [CourseService],
    controllers: [CourseController]
})
export class CourseModule { }