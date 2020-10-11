import { Injectable } from "@nestjs/common";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { CreateTestRequestDto } from "./dto/request/create-test.request-dto";

import { TestOptionService } from "./option/test-option.service";

import { TestRepository } from "./test.repository";

@Injectable()
export class TestService {

    constructor(
        private readonly testRepository: TestRepository,
        private readonly testOptionService: TestOptionService
    ) { }

    @Transactional()
    public async create(createDto: CreateTestRequestDto) {
        const test = this.testRepository.create({
            task: createDto.task,
            score: createDto.score
        });
        const savedTest = await this.testRepository.save(test);

        const testOptions = await this.testOptionService.createMany(
            createDto.testOptions,
            savedTest.id
        );
        savedTest.testOptions = testOptions;

        return savedTest;
    }
}