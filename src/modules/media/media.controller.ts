import { Controller, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";

import { FileInterceptor } from "@nestjs/platform-express";

import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { IdValidationPipe } from "../../common/pipe/id-validation.pipe";
import { SwaggerFileType } from "../../common/swagger/swagger-file.type";
import { File } from "../../common/type/file.type";

import { MediaResponseDto } from "./dto/response/media.response-dto";

import { MediaService } from "./media.service";

import { Response } from 'express';
import { JwtGuard } from "../guards/jwt.guard";

@ApiTags('media')
@Controller('media')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class MediaController {

    constructor(private readonly mediaService: MediaService) { }

    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: SwaggerFileType })
    @ApiOkResponse({ type: MediaResponseDto })
    async create(@UploadedFile() file: File) {
        const media = await this.mediaService.create(file);
        return new MediaResponseDto(media);
    }

    @Get(':id')
    async getById(
        @Param('id', IdValidationPipe) id: number,
        @Res() res: Response
    ) {
        const [media, buffer] = await this.mediaService.loadMedia(id);
        res.setHeader('Content-Type', media.mimetype);

        return res.send(buffer);
    }
}