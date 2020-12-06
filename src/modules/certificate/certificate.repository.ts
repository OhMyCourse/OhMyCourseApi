import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { Certificate } from "./certificate.entity";

@EntityRepository(Certificate)
export class CertificateRepository extends BaseRepository<Certificate> { }