import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";

import { TextContentRepository } from "./text-content.repository";

import { TextContentService } from "./text-content.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([TextContentRepository])
    ],
    providers: [TextContentService],
    exports: [TextContentService]
})
export class TextContentModule { }