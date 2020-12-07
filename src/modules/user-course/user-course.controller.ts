import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IncrementScoreRequestDto } from "./dto/increment-score.request-dto";
import { UserCourseResponseDto } from "./dto/user-course.response-dto";
import { UserCourseService } from "./user-course.service";

@ApiTags('userCourse')
@Controller('')
export class UserCourseController {

    constructor(private readonly userCourseService: UserCourseService) { }

    @Get('user/courses')
    async getSubscribedCourses(@Query('userId') userId: number) {
        const [courses, maxScores] = await this.userCourseService.getUserCourses(userId);
        return courses.map((course, i) => new UserCourseResponseDto(course, maxScores[i]));
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

    @Post('user/:userId/lesson/:lessonId/finish')
    async passLesson(
        @Param('lessonId') lessonId: number,
        @Param('userId') userId: number
    ) {
        return this.userCourseService.passLesson(lessonId, userId);
    }

    @Post('course/:courseId/user/:userId/complete')
    async completeCourse(
        @Param('courseId') courseId: number,
        @Param('userId') userId: number
    ) {
        return this.userCourseService.completeCourse(courseId, userId);
    }

    @Post('incrementScore')
    async incrementScore(@Body() incrementScoreDto: IncrementScoreRequestDto) {
        await this.userCourseService.incrementScore(incrementScoreDto);
    }
}