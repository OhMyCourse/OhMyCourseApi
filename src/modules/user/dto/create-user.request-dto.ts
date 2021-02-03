import { ApiProperty } from "@nestjs/swagger";

import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsOptional } from "class-validator";

import { IsId } from "../../../common/decorators/is-id.decorator";

export class CreateUserRequestDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    surname: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsDateString()
    birthday: Date;

    @ApiProperty()
    @IsOptional()
    bio?: string;

    @ApiProperty()
    @IsId()
    mediaId: number;
}