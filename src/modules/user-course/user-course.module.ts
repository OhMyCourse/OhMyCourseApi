import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserCourseController } from "./user-course.controller";
import { UserCourseRepository } from "./user-course.repository";
import { UserCourseService } from "./user-course.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserCourseRepository])
    ],
    providers: [UserCourseService],
    exports: [UserCourseService],
    controllers: [UserCourseController]
})
export class UserCourseModule {}