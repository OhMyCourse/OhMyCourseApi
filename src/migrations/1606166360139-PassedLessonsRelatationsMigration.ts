import {MigrationInterface, QueryRunner} from "typeorm";

export class PassedLessonsRelatationsMigration1606166360139 implements MigrationInterface {
    name = 'PassedLessonsRelatationsMigration1606166360139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_course_passed_lessons_lesson" ("user_course_id" integer NOT NULL, "lesson_id" integer NOT NULL, CONSTRAINT "PK_10f4f1923a23bbad61bc7a4609a" PRIMARY KEY ("user_course_id", "lesson_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1a3a512e08a5bad81fb82d363f" ON "user_course_passed_lessons_lesson" ("user_course_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c8b20eb0bc7d4ac6fedd0f888a" ON "user_course_passed_lessons_lesson" ("lesson_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_c8b20eb0bc7d4ac6fedd0f888a"`);
        await queryRunner.query(`DROP INDEX "IDX_1a3a512e08a5bad81fb82d363f"`);
        await queryRunner.query(`DROP TABLE "user_course_passed_lessons_lesson"`);
    }

}
