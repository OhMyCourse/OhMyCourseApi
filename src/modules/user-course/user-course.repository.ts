import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";

import { UserCourse } from "./user-course.entity";

@EntityRepository(UserCourse)
export class UserCourseRepository extends BaseRepository<UserCourse> { }