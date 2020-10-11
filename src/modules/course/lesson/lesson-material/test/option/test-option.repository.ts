import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";

import { TestOption } from "./test-option.entity";

@EntityRepository(TestOption)
export class TestOptionRepository extends BaseRepository<TestOption> { }