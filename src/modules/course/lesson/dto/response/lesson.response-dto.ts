import { ApiResponseProperty } from "@nestjs/swagger";
import { LessonMaterialResponseDto } from "../../lesson-material/dto/response/lesson-material.response-dto";
import { Lesson } from "../../lesson.entity";

export class LessonResponseDto {

    @ApiResponseProperty()
    id: number;

    @ApiResponseProperty()
    title: string;

    @ApiResponseProperty({ type: LessonMaterialResponseDto })
    materials: LessonMaterialResponseDto[];

    constructor(lesson: Lesson) {
        this.id = lesson.id;
        this.title = lesson.title;
        this.materials = lesson.lessonMaterials?.map(material => new LessonMaterialResponseDto(material));
    }
}