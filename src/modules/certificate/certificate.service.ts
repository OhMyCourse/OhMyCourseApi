import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CourseRepository } from "../course/course.repository";
import { UserCourseRepository } from "../user-course/user-course.repository";
import { Certificate } from "./certificate.entity";
import { CertificateRepository } from "./certificate.repository";
import { CreateCertificateRequestDto } from "./dto/create-certificate.request-dto";

@Injectable()
export class CertificateService {

    constructor(
        private readonly certificateRepository: CertificateRepository,
        private readonly userCourseRepository: UserCourseRepository,
        private readonly courseRepository: CourseRepository
    ) { }

    public async getUserCertificates(userId: number): Promise<[Certificate[], number[]]> {
        const certificates = await this.certificateRepository.createQueryBuilder('certificate')
            .leftJoinAndSelect('certificate.userCourse', 'userCourse')
            .leftJoinAndSelect('userCourse.course', 'course')
            .where('userCourse.userId = :userId', { userId })
            .getMany();

        const maxScores = await Promise.all(certificates.map(certificate => Promise.resolve(
            this.courseRepository.findMaxScore(certificate.userCourse.courseId)
        )));

        return [certificates, maxScores];
    }

    public async getByIdOrFail(id: number) {
        const certificate = await this.certificateRepository.findOne(id, { relations: ['userCourse'] });
        if (!certificate) {
            throw new NotFoundException('Certificate not found!');
        }
        return certificate;
    }

    public async create(createCertificateDto: CreateCertificateRequestDto) {
        const userCourse = await this.userCourseRepository.findOne({
            userId: createCertificateDto.userId,
            courseId: createCertificateDto.courseId
        })

        if (!userCourse) {
            throw new NotFoundException('Subscription not found!');
        }

        const oldCertificate = await this.certificateRepository.findOne({ userCourseId: userCourse.id });
        if (oldCertificate) {
            throw new ConflictException('Certificate already exists!');
        }

        const certificate = this.certificateRepository.create();
        certificate.userCourse = userCourse;

        return this.certificateRepository.save(certificate);
    }

    public async delete(id: number) {
        await this.getByIdOrFail(id);
        await this.certificateRepository.delete(id);
    }
}