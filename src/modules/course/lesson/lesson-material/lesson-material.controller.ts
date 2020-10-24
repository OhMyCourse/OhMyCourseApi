import { Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { IdValidationPipe } from "../../../../common/pipe/id-validation.pipe";

import { LessonMaterialResponseDto } from "./dto/response/lesson-material.response-dto";

import { LessonMaterialService } from "./lesson-material.service";

@ApiTags('lesson/material')
@Controller('lesson/material')
export class LessonMaterialController {

    constructor(private readonly lessonMaterialService: LessonMaterialService) { }

    @Get(':id')
    @ApiOkResponse({ type: LessonMaterialResponseDto })
    async getById(@Param('id', IdValidationPipe) id: number) {
        const lessonMaterial = await this.lessonMaterialService.getByIdWithRelationsOrFail(id);
        return new LessonMaterialResponseDto(lessonMaterial);
    }
}