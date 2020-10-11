import { ApiResponseProperty } from "@nestjs/swagger";

import { TestOption } from "../../test-option.entity";

export class TestOptionResponseDto {

    @ApiResponseProperty()
    id: number;

    @ApiResponseProperty()
    title: string;

    constructor(testOption: TestOption) {
        this.id = testOption.id;
        this.title = testOption.title;
    }
}