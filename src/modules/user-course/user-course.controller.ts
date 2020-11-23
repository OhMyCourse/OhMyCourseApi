import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserCourseService } from "./user-course.service";

@ApiTags('userCourse')
@Controller('')
export class UserCourseController {

    constructor(private readonly userCourseService: UserCourseService) { }

    @Get('user/courses')
    async getSubscribedCourses(@Query('userId') userId: number) {
        return this.userCourseService.getUserCourses(userId);
    }

    @Post('course/:courseId/user/:userId/join')
    async subscribe(
        @Param('courseId') courseId: number,
        @Param('userId') userId: number
    ) {
        return this.userCourseService.subscribe({
            courseId: courseId,
            userId: userId
        });
    }

    @Post('course/:courseId/user/:userId/quit')
    async unsubscribe(
        @Param('courseId') courseId: number,
        @Param('userId') userId: number
    ) {
        return this.userCourseService.unsubscribe({
            courseId: courseId,
            userId: userId
        });
    }
}