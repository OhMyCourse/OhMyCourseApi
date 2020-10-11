import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

import { IsEnum, IsOptional, ValidateIf, ValidateNested } from "class-validator";

import { IsId } from "../../../../../../common/decorators/is-id.decorator";

import { LessonType } from "../../../../../../common/enums/lesson-type.enum";

import { CreateTestRequestDto } from "../../test/dto/request/create-test.request-dto";
import { CreateTextContentRequestDto } from "../../text-content/dto/request/create-text-content.request-dto";

export class CreateLessonMaterialRequestDto {

    @ApiProperty({ enum: LessonType })
    @IsEnum(LessonType)
    type: LessonType;

    @ApiProperty()
    @IsOptional()
    @IsId()
    mediaId: number;

    @ApiProperty({ type: CreateTextContentRequestDto })
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateTextContentRequestDto)
    textContent: CreateTextContentRequestDto;

    @ApiProperty({ type: CreateTestRequestDto })
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateTestRequestDto)
    test: CreateTestRequestDto;
}