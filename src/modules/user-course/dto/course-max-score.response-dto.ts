import { ApiResponseProperty } from "@nestjs/swagger";
import { Course } from "../../course/course.entity";
import { CourseResponseDto } from "../../course/dto/response/course.response-dto";

export class CourseMaxScoreResponseDto {

    @ApiResponseProperty({ type: CourseResponseDto })
    course: CourseResponseDto;

    @ApiResponseProperty()
    maxScore: number;

    constructor(course: Course, maxScore: number) {
        this.course = new CourseResponseDto(course);
        this.maxScore = maxScore;
    }
}