import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { CourseCategory } from "../../../../common/enums/course-category.enum";

export class FilterCourseRequestDto {

    @ApiProperty({ required: false })
    @IsOptional()
    name?: string;

    @ApiProperty({ enum: CourseCategory, required: false })
    @IsOptional()
    @IsEnum(CourseCategory)
    category?: CourseCategory;
}