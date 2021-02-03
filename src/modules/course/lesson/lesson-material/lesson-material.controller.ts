import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { IdValidationPipe } from "../../../../common/pipe/id-validation.pipe";
import { JwtGuard } from "../../../guards/jwt.guard";

import { LessonMaterialResponseDto } from "./dto/response/lesson-material.response-dto";

import { LessonMaterialService } from "./lesson-material.service";

@ApiTags('lesson/material')
@Controller('lesson/material')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class LessonMaterialController {

    constructor(private readonly lessonMaterialService: LessonMaterialService) { }

    @Get(':id')
    @ApiOkResponse({ type: LessonMaterialResponseDto })
    async getById(@Param('id', IdValidationPipe) id: number) {
        const lessonMaterial = await this.lessonMaterialService.getByIdWithRelationsOrFail(id);
        return new LessonMaterialResponseDto(lessonMaterial);
    }
}