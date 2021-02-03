import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";

import { Test } from "./test.entity";

@EntityRepository(Test)
export class TestRepository extends BaseRepository<Test> { }