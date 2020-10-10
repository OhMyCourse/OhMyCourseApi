import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";

import { Media } from "./media.entity";

@EntityRepository(Media)
export class MediaRepository extends BaseRepository<Media> {

    public async findUnboundById(id: number): Promise<Media> {
        return this.createQueryBuilder('media')
            .leftJoinAndSelect('media.course', 'course')
            .leftJoinAndSelect('media.lessonMaterial', 'lessonMaterial')
            .leftJoinAndSelect('media.user', 'user')
            .where('media.id = :id', { id })
            .andWhere('course.id IS NULL')
            .andWhere('lessonMaterial.id IS NULL')
            .andWhere('user.id IS NULL')
            .getOne();
    }
}