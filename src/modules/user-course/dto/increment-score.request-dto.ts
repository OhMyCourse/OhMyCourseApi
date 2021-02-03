import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

import { IsId } from "../../../common/decorators/is-id.decorator";

export class IncrementScoreRequestDto {

    @ApiProperty()
    @IsId()
    userId: number;

    @ApiProperty()
    @IsId()
    courseId: number;

    @ApiProperty()
    @IsNumber()
    score: number;
}