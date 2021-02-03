import { ApiResponseProperty } from "@nestjs/swagger";
import { UserCourseStatus } from "../../../common/enums/user-course-status.enum";
import { UserCourse } from "../user-course.entity";
import { CourseMaxScoreResponseDto } from "./course-max-score.response-dto";

export class UserCourseResponseDto {

    @ApiResponseProperty()
    id: number;

    @ApiResponseProperty({ type: UserCourseStatus })
    status: UserCourseStatus;

    @ApiResponseProperty()
    score: number;

    @ApiResponseProperty({ type: CourseMaxScoreResponseDto })
    course: CourseMaxScoreResponseDto;

    constructor(userCourse: UserCourse, maxScores: number) {
        this.id = userCourse.id;
        this.status = userCourse.status;
        this.score = userCourse.score;
        this.course = new CourseMaxScoreResponseDto(userCourse.course, maxScores);
    }
}