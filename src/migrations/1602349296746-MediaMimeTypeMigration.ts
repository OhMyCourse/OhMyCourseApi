import {MigrationInterface, QueryRunner} from "typeorm";

export class MediaMimeTypeMigration1602349296746 implements MigrationInterface {
    name = 'MediaMimeTypeMigration1602349296746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" ADD "mimetype" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "mimetype"`);
    }

}
