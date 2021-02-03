import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, MaxLength } from "class-validator";

import { IsId } from "../../../../common/decorators/is-id.decorator";
import { CourseCategory } from "../../../../common/enums/course-category.enum";

export class CreateCourseRequestDto {

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsId()
    mediaId: number;

    @ApiProperty({ enum: CourseCategory })
    @IsEnum(CourseCategory)
    category: CourseCategory;
}