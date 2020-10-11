import { ApiResponseProperty } from "@nestjs/swagger";

import { TestOptionResponseDto } from "../../option/dto/response/test-option.response-dto";
import { Test } from "../../test.entity";

export class TestResponseDto {

    @ApiResponseProperty()
    id: number;

    @ApiResponseProperty()
    task: string;

    @ApiResponseProperty()
    score: number;

    @ApiResponseProperty({ type: [TestOptionResponseDto] })
    options: TestOptionResponseDto[];

    constructor(test: Test) {
        this.id = test.id;
        this.task = test.task;
        this.score = test.score;
        this.options = test.testOptions?.map(option => new TestOptionResponseDto(option));
    }
}