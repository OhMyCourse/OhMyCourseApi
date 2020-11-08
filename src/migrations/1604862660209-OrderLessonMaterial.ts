import {MigrationInterface, QueryRunner} from "typeorm";

export class OrderLessonMaterial1604862660209 implements MigrationInterface {
    name = 'OrderLessonMaterial1604862660209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson_material" ADD "order" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson_material" DROP COLUMN "order"`);
    }

}
