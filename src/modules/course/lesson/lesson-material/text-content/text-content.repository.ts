import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";

import { TextContent } from "./text-content.entity";

@EntityRepository(TextContent)
export class TextContentRepository extends BaseRepository<TextContent> { }