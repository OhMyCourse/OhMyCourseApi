import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveUniqueConstraintMediaIdUserMigration1606078550453 implements MigrationInterface {
    name = 'RemoveUniqueConstraintMediaIdUserMigration1606078550453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_9c08bde4931ab78abb8729714a3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_cd05eb25f03b90e425b3780d149"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_9c08bde4931ab78abb8729714a3" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_9c08bde4931ab78abb8729714a3"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_cd05eb25f03b90e425b3780d149" UNIQUE ("media_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_9c08bde4931ab78abb8729714a3" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
