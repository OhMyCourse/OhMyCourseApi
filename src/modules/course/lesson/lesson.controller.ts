import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { IdValidationPipe } from "../../../common/pipe/id-validation.pipe";

import { LessonService } from "./lesson.service";

import { LessonResponseDto } from "./dto/response/lesson.response-dto";
import { CreateLessonRequestDto } from "./dto/request/create-lesson.request-dto";

@ApiTags('lesson')
@Controller('lesson')
export class LessonController {

    constructor(private readonly lessonService: LessonService) { }

    @Get(':id')
    @ApiOkResponse({ type: LessonResponseDto })
    async getById(@Param('id', IdValidationPipe) id: number) {
        const lesson = await this.lessonService.getByIdWithMaterialsOrFail(id);
        return new LessonResponseDto(lesson);
    }

    @Post()
    @ApiOkResponse({ type: LessonResponseDto })
    async create(@Body() createDto: CreateLessonRequestDto) {
        const lesson = await this.lessonService.create(createDto);
        return new LessonResponseDto(lesson);
    }

    @Delete(':id')
    async deleteById(@Param('id', IdValidationPipe) id: number) {
        await this.lessonService.deleteById(id);
    }
}