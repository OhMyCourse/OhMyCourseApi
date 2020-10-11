import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";

import { TestOptionRepository } from "./test-option.repository";
import { TestOptionService } from "./test-option.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([TestOptionRepository])
    ],
    providers: [TestOptionService],
    exports: [TestOptionService]
})
export class TestOptionModule { }