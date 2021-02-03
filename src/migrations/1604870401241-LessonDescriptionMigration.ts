import {MigrationInterface, QueryRunner} from "typeorm";

export class LessonDescriptionMigration1604870401241 implements MigrationInterface {
    name = 'LessonDescriptionMigration1604870401241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson" ADD "description" text DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson" DROP COLUMN "description"`);
    }

}
