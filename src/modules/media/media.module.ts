import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SharedModule } from "../../shared/shared.module";

import { MediaController } from "./media.controller";
import { MediaRepository } from "./media.repository";
import { MediaService } from "./media.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([MediaRepository]),
        SharedModule
    ],
    providers: [MediaService],
    controllers: [MediaController],
    exports: [MediaService]
})
export class MediaModule { }