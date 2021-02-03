import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";

import { LessonMaterialFacade } from "./lesson-material.facade";
import { LessonMaterialRepository } from "./lesson-material.repository";
import { LessonMaterialService } from "./lesson-material.service";

import { TestModule } from "./test/test.module";
import { TextContentModule } from "./text-content/text-content.module";
import { MediaModule } from "../../../media/media.module";
import { LessonMaterialController } from "./lesson-material.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([LessonMaterialRepository]),
        TestModule,
        TextContentModule,
        MediaModule
    ],
    providers: [LessonMaterialService, LessonMaterialFacade],
    exports: [LessonMaterialFacade],
    controllers: [LessonMaterialController]
})
export class LessonMaterialModule { }