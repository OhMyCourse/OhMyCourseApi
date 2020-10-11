import { ApiProperty } from "@nestjs/swagger";

import { Type } from "class-transformer";
import { IsNotEmpty, MaxLength, ValidateNested } from "class-validator";

import { IsId } from "../../../../../common/decorators/is-id.decorator";

import { CreateLessonMaterialRequestDto } from "../../lesson-material/dto/request/create-lesson-material.request-dto";

export class CreateLessonRequestDto {

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    title: string;

    @ApiProperty()
    @IsId()
    courseId: number;

    @ApiProperty({ type: [CreateLessonMaterialRequestDto] })
    @ValidateNested({ each: true })
    @Type(() => CreateLessonMaterialRequestDto)
    lessonMaterials: CreateLessonMaterialRequestDto[];
}