import {MigrationInterface, QueryRunner} from "typeorm";

export class ImageLessonTypeMigration1603568915998 implements MigrationInterface {
    name = 'ImageLessonTypeMigration1603568915998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."lesson_material_type_enum" RENAME TO "lesson_material_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "lesson_material_type_enum" AS ENUM('audio', 'video', 'image', 'text', 'test')`);
        await queryRunner.query(`ALTER TABLE "lesson_material" ALTER COLUMN "type" TYPE "lesson_material_type_enum" USING "type"::"text"::"lesson_material_type_enum"`);
        await queryRunner.query(`DROP TYPE "lesson_material_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "lesson_material_type_enum_old" AS ENUM('audio', 'video', 'text', 'test')`);
        await queryRunner.query(`ALTER TABLE "lesson_material" ALTER COLUMN "type" TYPE "lesson_material_type_enum_old" USING "type"::"text"::"lesson_material_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "lesson_material_type_enum"`);
        await queryRunner.query(`ALTER TYPE "lesson_material_type_enum_old" RENAME TO  "lesson_material_type_enum"`);
    }

}
