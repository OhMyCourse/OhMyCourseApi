import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Max, MaxLength, Min, ValidateNested } from "class-validator";
import { CreateTestOptionRequestDto } from "../../option/dto/request/create-test-option.request-dto";

export class CreateTestRequestDto {

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    task: string;

    @ApiProperty()
    @IsNumber()
    @Min(1)
    @Max(10)
    score: number;

    @ApiProperty({ type: [CreateTestOptionRequestDto] })
    @ValidateNested({ each: true })
    @Type(() => CreateTestOptionRequestDto)
    testOptions: CreateTestOptionRequestDto[];
}