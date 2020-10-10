import { ApiResponseProperty } from "@nestjs/swagger";
import { Media } from "../../media.entity";

export class MediaResponseDto {

    @ApiResponseProperty()
    id: number;

    @ApiResponseProperty()
    fileName: string;

    @ApiResponseProperty()
    mimetype: string;

    @ApiResponseProperty()
    title: string;

    constructor(media: Media) {
        this.id = media.id;
        this.fileName = media.fileName;
        this.title = media.title;
        this.mimetype = media.mimetype;
    }
}