import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserCourseModule } from "../user-course/user-course.module";
import { UserCourseRepository } from "../user-course/user-course.repository";
import { CertificateController } from "./certificate.controller";
import { CertificateRepository } from "./certificate.repository";
import { CertificateService } from "./certificate.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([CertificateRepository, UserCourseRepository]),
    ],
    controllers: [CertificateController],
    providers: [CertificateService],
    exports: [CertificateService]
})
export class CertificateModule { }