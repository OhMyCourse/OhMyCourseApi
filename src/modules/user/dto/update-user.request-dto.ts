import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsOptional } from "class-validator";

export class UpdateUserRequestDto {

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsDateString()
    birthday: Date;

    @ApiProperty()
    @IsOptional()
    bio?: string;

    @ApiProperty()
    @IsOptional()
    mediaId?: number;
}