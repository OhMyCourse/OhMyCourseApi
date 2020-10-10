import { ApiResponseProperty } from "@nestjs/swagger";

import { MediaResponseDto } from "../../../media/dto/response/media.response-dto";

import { Course } from "../../course.entity";

export class CourseResponseDto {

    @ApiResponseProperty()
    id: number;

    @ApiResponseProperty()
    name: string;

    @ApiResponseProperty()
    description: string;

    @ApiResponseProperty({ type: MediaResponseDto })
    media: MediaResponseDto;

    constructor(course: Course) {
        this.id = course.id;
        this.name = course.name;
        this.description = course.description;

        if (course.media) this.media = new MediaResponseDto(course.media);
    }
}