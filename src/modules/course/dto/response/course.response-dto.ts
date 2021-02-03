import { ApiResponseProperty } from "@nestjs/swagger";

import { MediaResponseDto } from "../../../media/dto/response/media.response-dto";

import { Course } from "../../course.entity";
import { LessonResponseDto } from "../../lesson/dto/response/lesson.response-dto";

export class CourseResponseDto {

    @ApiResponseProperty()
    id: number;

    @ApiResponseProperty()
    name: string;

    @ApiResponseProperty()
    description: string;

    @ApiResponseProperty({ type: MediaResponseDto })
    media: MediaResponseDto;

    @ApiResponseProperty({ type: [LessonResponseDto] })
    lessons: LessonResponseDto[];

    constructor(course: Course) {
        this.id = course.id;
        this.name = course.name;
        this.description = course.description;

        this.lessons = course.lessons?.map(lesson => new LessonResponseDto(lesson));

        if (course.media) this.media = new MediaResponseDto(course.media);
    }
}