import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserRequestDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsDateString()
    birthday: Date;

    @ApiProperty()
    @IsOptional()
    biography?: string;

    @ApiProperty()
    @IsOptional()
    mediaId?: number;
}