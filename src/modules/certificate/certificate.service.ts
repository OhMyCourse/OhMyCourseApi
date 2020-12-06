import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CertificateRepository } from "./certificate.repository";
import { CreateCertificateRequestDto } from "./dto/create-certificate.request-dto";

@Injectable()
export class CertificateService {

    constructor(private readonly certificateRepository: CertificateRepository) { }

    public async getByIdOrFail(id: number) {
        const certificate = await this.certificateRepository.findOne(id, { relations: ['userCourse'] });
        if (!certificate) {
            throw new NotFoundException('Certificate not found!');
        }
        return certificate;
    }

    public async create(createCertificateDto: CreateCertificateRequestDto) {
        const oldCertificate = await this.certificateRepository.findOne({ userCourseId: createCertificateDto.userCourseId });
        if (oldCertificate) {
            throw new ConflictException('Certificate already exists!');
        }

        const certificate = this.certificateRepository.create(createCertificateDto);
        return this.certificateRepository.save(certificate);
    }

    public async delete(id: number) {
        await this.getByIdOrFail(id);
        await this.certificateRepository.delete(id);
    }
}