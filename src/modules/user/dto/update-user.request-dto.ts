import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsOptional } from "class-validator";

export class UpdateUserRequestDto {

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsDateString()
    dateOfBirth: Date;

    @ApiProperty()
    @IsOptional()
    biography?: string;

    @ApiProperty()
    @IsOptional()
    mediaId?: number;
}