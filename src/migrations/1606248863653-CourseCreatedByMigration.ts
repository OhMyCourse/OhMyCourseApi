import {MigrationInterface, QueryRunner} from "typeorm";

export class CourseCreatedByMigration1606248863653 implements MigrationInterface {
    name = 'CourseCreatedByMigration1606248863653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_bb2c8374d6f04bf9301895d1b33" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_bb2c8374d6f04bf9301895d1b33"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "user_id"`);
    }

}
