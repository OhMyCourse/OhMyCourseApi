import {MigrationInterface, QueryRunner} from "typeorm";

export class CertificateMigration1607287487702 implements MigrationInterface {
    name = 'CertificateMigration1607287487702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "certificate_file_name_uindex"`);
        await queryRunner.query(`ALTER TABLE "certificate" DROP COLUMN "file_name"`);
        await queryRunner.query(`ALTER TABLE "certificate" ADD "date" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "certificate" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "certificate" ADD "file_name" character varying(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "certificate_file_name_uindex" ON "certificate" ("file_name") `);
    }

}
