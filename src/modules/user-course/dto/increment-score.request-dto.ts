import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

import { IsId } from "../../../common/decorators/is-id.decorator";

export class IncrementScoreRequestDto {

    @ApiProperty()
    @IsId()
    subscriptionId: number;

    @ApiProperty()
    @IsNumber()
    score: number;
}