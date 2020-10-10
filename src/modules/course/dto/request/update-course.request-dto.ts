import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, MaxLength } from "class-validator";

import { IsId } from "../../../../common/decorators/is-id.decorator";

export class UpdateCourseRequestDto {

    @ApiProperty()
    @IsOptional()
    description: string;

    @ApiProperty()
    @IsOptional()
    @IsId()
    mediaId: number;
}