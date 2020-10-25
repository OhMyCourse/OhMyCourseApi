import { ApiResponseProperty } from "@nestjs/swagger";

import { TestOption } from "../../test-option.entity";

export class TestOptionResponseDto {

    @ApiResponseProperty()
    id: number;

    @ApiResponseProperty()
    title: string;

    @ApiResponseProperty()
    isRight: boolean;

    constructor(testOption: TestOption) {
        this.id = testOption.id;
        this.title = testOption.title;
        this.isRight = testOption.isRight;
    }
}