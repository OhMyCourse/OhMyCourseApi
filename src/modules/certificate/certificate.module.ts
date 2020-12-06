import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CertificateController } from "./certificate.controller";
import { CertificateRepository } from "./certificate.repository";
import { CertificateService } from "./certificate.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([CertificateRepository])
    ],
    controllers: [CertificateController],
    providers: [CertificateService],
    exports: [CertificateService]
})
export class CertificateModule { }