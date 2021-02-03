import {MigrationInterface, QueryRunner} from "typeorm";

export class DeleteCourseMigration1607294166017 implements MigrationInterface {
    name = 'DeleteCourseMigration1607294166017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_course" DROP CONSTRAINT "FK_a17a0128f2f4fbb56ca04a07036"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_course" ADD CONSTRAINT "FK_a17a0128f2f4fbb56ca04a07036" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
