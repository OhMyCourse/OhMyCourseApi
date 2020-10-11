import { ApiProperty } from "@nestjs/swagger";

import { IsBoolean, IsNotEmpty } from "class-validator";

export class CreateTextContentRequestDto {

    @ApiProperty()
    @IsNotEmpty()
    text: string;

    @ApiProperty()
    @IsBoolean()
    isTip: boolean;
}