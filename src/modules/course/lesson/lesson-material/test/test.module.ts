import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";

import { TestRepository } from "./test.repository";
import { TestService } from "./test.service";

import { TestOptionModule } from './option/test-option.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([TestRepository]),
        TestOptionModule
    ],
    providers: [TestService],
    exports: [TestService]
})
export class TestModule { }