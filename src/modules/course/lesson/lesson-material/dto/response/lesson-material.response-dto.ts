import { ApiResponseProperty } from "@nestjs/swagger";

import { LessonType } from "../../../../../../common/enums/lesson-type.enum";

import { MediaResponseDto } from "../../../../../media/dto/response/media.response-dto";
import { LessonMaterial } from "../../lesson-material.entity";
import { TestResponseDto } from "../../test/dto/response/test.response-dto";
import { TextContentResponseDto } from "../../text-content/dto/response/text-content.response-dto";

export class LessonMaterialResponseDto {

    @ApiResponseProperty()
    id: number;

    @ApiResponseProperty({ enum: LessonType })
    type: LessonType;

    @ApiResponseProperty()
    order: number;

    @ApiResponseProperty({ type: MediaResponseDto })
    media: MediaResponseDto;

    @ApiResponseProperty({ type: TextContentResponseDto })
    textContent: TextContentResponseDto;

    @ApiResponseProperty({ type: TestResponseDto })
    test: TestResponseDto;

    constructor(lessonMaterial: LessonMaterial) {
        this.id = lessonMaterial.id;
        this.type = lessonMaterial.type;
        this.order = lessonMaterial.order;

        if (lessonMaterial.media) this.media = new MediaResponseDto(lessonMaterial.media);
        if (lessonMaterial.textContent) this.textContent = new TextContentResponseDto(lessonMaterial.textContent);
        if (lessonMaterial.test) this.test = new TestResponseDto(lessonMaterial.test);
    }
}