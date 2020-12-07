import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CertificateService } from "./certificate.service";
import { CreateCertificateRequestDto } from "./dto/create-certificate.request-dto";
import { UserCertificateResponseDto } from "./dto/user-certificate.response-dto";

@ApiTags('certificate')
@Controller('certificate')
export class CertificateController {

    constructor(private readonly certificateService: CertificateService) { }

    @Get('userCertificates')
    async getUserCertificates(@Query('userId') userId: number) {
        const [certificates, maxScores] = await this.certificateService.getUserCertificates(userId);
        return certificates.map((certificate, i) => new UserCertificateResponseDto(certificate, maxScores[i]));
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        return this.certificateService.getByIdOrFail(id);
    }

    @Post('')
    async create(@Body() createCertificateDto: CreateCertificateRequestDto) {
        return this.certificateService.create(createCertificateDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.certificateService.delete(id);
    }
}