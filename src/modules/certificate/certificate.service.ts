import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UserCourseRepository } from "../user-course/user-course.repository";
import { CertificateRepository } from "./certificate.repository";
import { CreateCertificateRequestDto } from "./dto/create-certificate.request-dto";

@Injectable()
export class CertificateService {

    constructor(
        private readonly certificateRepository: CertificateRepository,
        private readonly userCourseRepository: UserCourseRepository
    ) { }

    public async getUserCertificates(userId: number) {
        return this.certificateRepository.createQueryBuilder('certificate')
            .leftJoinAndSelect('certificate.userCourse', 'userCourse')
            .where('userCourse.userId = :userId', { userId })
            .getMany();
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