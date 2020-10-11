import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";

import { LessonMaterial } from "./lesson-material.entity";

@EntityRepository(LessonMaterial)
export class LessonMaterialRepository extends BaseRepository<LessonMaterial> {
    
}