import { Injectable } from "@nestjs/common";
import { Transactional } from "typeorm-transactional-cls-hooked";
import { CreateTestOptionRequestDto } from "./dto/request/create-test-option.request-dto";
import { TestOption } from "./test-option.entity";

import { TestOptionRepository } from "./test-option.repository";

@Injectable()
export class TestOptionService {

    constructor(private readonly testOptionRepository: TestOptionRepository) { }

    @Transactional()
    public async createMany(createDtos: CreateTestOptionRequestDto[], testId: number): Promise<TestOption[]> {
        const testOptions = createDtos.map(createDto => this.testOptionRepository.create({
            ...createDto,
            testId: testId
        }));
        return this.testOptionRepository.save(testOptions);
    }
}