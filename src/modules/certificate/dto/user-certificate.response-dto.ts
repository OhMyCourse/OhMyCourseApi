import { ApiResponseProperty } from "@nestjs/swagger";
import { UserCourseResponseDto } from "../../user-course/dto/user-course.response-dto";
import { Certificate } from "../certificate.entity";

export class UserCertificateResponseDto {

    @ApiResponseProperty()
    id: number;

    @ApiResponseProperty()
    date: Date;

    @ApiResponseProperty()
    userCourse: UserCourseResponseDto;

    constructor(certificate: Certificate, maxScore: number) {
        this.id = certificate.id;
        this.date = certificate.date;
        this.userCourse = new UserCourseResponseDto(certificate.userCourse, maxScore);
    }
}