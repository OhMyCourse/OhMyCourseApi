import {MigrationInterface, QueryRunner} from "typeorm";

export class CourseCategoryMigration1607292576839 implements MigrationInterface {
    name = 'CourseCategoryMigration1607292576839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "course_category_enum" AS ENUM('programming', 'science', 'talking', 'language', 'engineering')`);
        await queryRunner.query(`ALTER TABLE "course" ADD "category" "course_category_enum" NOT NULL DEFAULT 'engineering'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "category"`);
        await queryRunner.query(`DROP TYPE "course_category_enum"`);
    }

}
