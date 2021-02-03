import { ApiResponseProperty } from "@nestjs/swagger";
import { TextContent } from "../../text-content.entity";

export class TextContentResponseDto {

    @ApiResponseProperty()
    id: number;

    @ApiResponseProperty()
    text: string;

    @ApiResponseProperty()
    isTip: boolean;

    constructor(textContent: TextContent) {
        this.id = textContent.id;
        this.text = textContent.text;
        this.isTip = textContent.isTip;
    }
}