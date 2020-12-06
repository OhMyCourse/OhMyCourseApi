import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { CourseCategory } from "../../../../common/enums/course-category.enum";

export class FilterCourseRequestDto {

    @ApiProperty()
    @IsOptional()
    name?: string;

    @ApiProperty({ enum: CourseCategory })
    @IsOptional()
    @IsEnum(CourseCategory)
    category?: CourseCategory;
}