import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTablesMigration1602340795528 implements MigrationInterface {
    name = 'CreateTablesMigration1602340795528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."category" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "PK_a2fd3397138f6f29d0cdad6ba06" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "course_category_name_uindex" ON "public"."category" ("name") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "course_category_pk" ON "public"."category" ("id") `);
        await queryRunner.query(`CREATE TABLE "public"."lesson" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "course_id" integer, CONSTRAINT "PK_906c22ef9398d515ba87e0fb0fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "lesson_pk" ON "public"."lesson" ("id") `);
        await queryRunner.query(`CREATE TABLE "public"."text_content" ("id" SERIAL NOT NULL, "text" text NOT NULL, "is_tip" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_d11c3dd65e483f7f0fa4d22e456" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "text_content_pk" ON "public"."text_content" ("id") `);
        await queryRunner.query(`CREATE TABLE "public"."test_option" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "is_right" boolean NOT NULL, "test_id" integer, CONSTRAINT "PK_5ef36f65cf9fb8d0ad2be84cb18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "test_option_pk" ON "public"."test_option" ("id") `);
        await queryRunner.query(`CREATE TABLE "public"."test" ("id" SERIAL NOT NULL, "task" character varying(255) NOT NULL, "score" double precision NOT NULL, CONSTRAINT "PK_24ae32a08015e7446b96a15929b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "test_pk" ON "public"."test" ("id") `);
        await queryRunner.query(`CREATE TYPE "public"."lesson_material_type_enum" AS ENUM('audio', 'video', 'text', 'test')`);
        await queryRunner.query(`CREATE TABLE "public"."lesson_material" ("id" SERIAL NOT NULL, "type" "public"."lesson_material_type_enum" NOT NULL, "lesson_id" integer, "media_id" integer, "test_id" integer, "text_content_id" integer, CONSTRAINT "REL_665d6e53f41c21fa694d6eb6b9" UNIQUE ("media_id"), CONSTRAINT "REL_c6d450882fe6714d2e925e428c" UNIQUE ("test_id"), CONSTRAINT "REL_6dea05e964b938261460b61521" UNIQUE ("text_content_id"), CONSTRAINT "PK_d98322e39da01bd320bb31dcc94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "lesson_material_pk" ON "public"."lesson_material" ("id") `);
        await queryRunner.query(`CREATE TABLE "public"."users" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "surname" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "birthday" TIMESTAMP NOT NULL, "bio" text, "media_id" integer NOT NULL, CONSTRAINT "UQ_cd05eb25f03b90e425b3780d149" UNIQUE ("media_id"), CONSTRAINT "REL_cd05eb25f03b90e425b3780d14" UNIQUE ("media_id"), CONSTRAINT "PK_a6cc71bedf15a41a5f5ee8aea97" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "users_pk" ON "public"."users" ("id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "users_email_uindex" ON "public"."users" ("email") `);
        await queryRunner.query(`CREATE TABLE "public"."media" ("id" SERIAL NOT NULL, "file_name" character varying(255) NOT NULL, "title" character varying(255), CONSTRAINT "PK_74f074989d0941bf09d6d535c90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "media_pk" ON "public"."media" ("id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "media_file_name_uindex" ON "public"."media" ("file_name") `);
        await queryRunner.query(`CREATE TABLE "public"."course" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, "media_id" integer, CONSTRAINT "REL_1ed87f4591e1834fa3666b11d4" UNIQUE ("media_id"), CONSTRAINT "PK_da227846c2a3368db0fca526df8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "course_name_uindex" ON "public"."course" ("name") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "course_pk" ON "public"."course" ("id") `);
        await queryRunner.query(`CREATE TYPE "public"."user_course_status_enum" AS ENUM('started', 'finished')`);
        await queryRunner.query(`CREATE TABLE "public"."user_course" ("id" SERIAL NOT NULL, "status" "public"."user_course_status_enum" NOT NULL DEFAULT 'started', "score" double precision NOT NULL DEFAULT 0, "course_id" integer, "user_id" integer, CONSTRAINT "PK_31688d5a2a89305d72196f864cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "user_course_pk" ON "public"."user_course" ("id") `);
        await queryRunner.query(`CREATE TABLE "public"."certificate" ("id" SERIAL NOT NULL, "file_name" character varying(255) NOT NULL, "user_course_id" integer, CONSTRAINT "REL_b4421b7fa4c4467c54b691e97b" UNIQUE ("user_course_id"), CONSTRAINT "PK_13e900740c441e86f823e228a10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "certificate_pk" ON "public"."certificate" ("id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "certificate_file_name_uindex" ON "public"."certificate" ("file_name") `);
        await queryRunner.query(`CREATE TABLE "public"."course_categories_category" ("course_id" integer NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_47039a2a0489e04f6013680120d" PRIMARY KEY ("course_id", "category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_069b326cff8f6dcf402c3ccca6" ON "public"."course_categories_category" ("course_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7a08dc33bc15f51e07383d1fc0" ON "public"."course_categories_category" ("category_id") `);
        await queryRunner.query(`CREATE TABLE "public"."user_course_test_options_test_option" ("user_course_id" integer NOT NULL, "test_option_id" integer NOT NULL, CONSTRAINT "PK_629f6ac3c9b9e6ca04b3df95d63" PRIMARY KEY ("user_course_id", "test_option_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_32846081c4de14387b1a812494" ON "public"."user_course_test_options_test_option" ("user_course_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9a5b257bf9ac8bbc9744143f63" ON "public"."user_course_test_options_test_option" ("test_option_id") `);
        await queryRunner.query(`ALTER TABLE "public"."lesson" ADD CONSTRAINT "FK_360a7cb022c9d75eb69a3a0334d" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."test_option" ADD CONSTRAINT "FK_780ad48958f3d2882cd51f07471" FOREIGN KEY ("test_id") REFERENCES "public"."test"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."lesson_material" ADD CONSTRAINT "FK_14237286cb05699137539d24bdc" FOREIGN KEY ("lesson_id") REFERENCES "public"."lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."lesson_material" ADD CONSTRAINT "FK_665d6e53f41c21fa694d6eb6b90" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."lesson_material" ADD CONSTRAINT "FK_c6d450882fe6714d2e925e428cb" FOREIGN KEY ("test_id") REFERENCES "public"."test"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."lesson_material" ADD CONSTRAINT "FK_6dea05e964b938261460b61521d" FOREIGN KEY ("text_content_id") REFERENCES "public"."text_content"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."users" ADD CONSTRAINT "FK_cd05eb25f03b90e425b3780d149" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."course" ADD CONSTRAINT "FK_1ed87f4591e1834fa3666b11d4e" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."user_course" ADD CONSTRAINT "FK_e2b1e2fc60af9130744ccf4df8c" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."user_course" ADD CONSTRAINT "FK_9e48be498cd90f39f96bfa1ea79" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."certificate" ADD CONSTRAINT "FK_b4421b7fa4c4467c54b691e97b1" FOREIGN KEY ("user_course_id") REFERENCES "public"."user_course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."course_categories_category" ADD CONSTRAINT "FK_069b326cff8f6dcf402c3ccca6c" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."course_categories_category" ADD CONSTRAINT "FK_7a08dc33bc15f51e07383d1fc0d" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."user_course_test_options_test_option" ADD CONSTRAINT "FK_32846081c4de14387b1a8124940" FOREIGN KEY ("user_course_id") REFERENCES "public"."user_course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."user_course_test_options_test_option" ADD CONSTRAINT "FK_9a5b257bf9ac8bbc9744143f637" FOREIGN KEY ("test_option_id") REFERENCES "public"."test_option"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user_course_test_options_test_option" DROP CONSTRAINT "FK_9a5b257bf9ac8bbc9744143f637"`);
        await queryRunner.query(`ALTER TABLE "public"."user_course_test_options_test_option" DROP CONSTRAINT "FK_32846081c4de14387b1a8124940"`);
        await queryRunner.query(`ALTER TABLE "public"."course_categories_category" DROP CONSTRAINT "FK_7a08dc33bc15f51e07383d1fc0d"`);
        await queryRunner.query(`ALTER TABLE "public"."course_categories_category" DROP CONSTRAINT "FK_069b326cff8f6dcf402c3ccca6c"`);
        await queryRunner.query(`ALTER TABLE "public"."certificate" DROP CONSTRAINT "FK_b4421b7fa4c4467c54b691e97b1"`);
        await queryRunner.query(`ALTER TABLE "public"."user_course" DROP CONSTRAINT "FK_9e48be498cd90f39f96bfa1ea79"`);
        await queryRunner.query(`ALTER TABLE "public"."user_course" DROP CONSTRAINT "FK_e2b1e2fc60af9130744ccf4df8c"`);
        await queryRunner.query(`ALTER TABLE "public"."course" DROP CONSTRAINT "FK_1ed87f4591e1834fa3666b11d4e"`);
        await queryRunner.query(`ALTER TABLE "public"."users" DROP CONSTRAINT "FK_cd05eb25f03b90e425b3780d149"`);
        await queryRunner.query(`ALTER TABLE "public"."lesson_material" DROP CONSTRAINT "FK_6dea05e964b938261460b61521d"`);
        await queryRunner.query(`ALTER TABLE "public"."lesson_material" DROP CONSTRAINT "FK_c6d450882fe6714d2e925e428cb"`);
        await queryRunner.query(`ALTER TABLE "public"."lesson_material" DROP CONSTRAINT "FK_665d6e53f41c21fa694d6eb6b90"`);
        await queryRunner.query(`ALTER TABLE "public"."lesson_material" DROP CONSTRAINT "FK_14237286cb05699137539d24bdc"`);
        await queryRunner.query(`ALTER TABLE "public"."test_option" DROP CONSTRAINT "FK_780ad48958f3d2882cd51f07471"`);
        await queryRunner.query(`ALTER TABLE "public"."lesson" DROP CONSTRAINT "FK_360a7cb022c9d75eb69a3a0334d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9a5b257bf9ac8bbc9744143f63"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_32846081c4de14387b1a812494"`);
        await queryRunner.query(`DROP TABLE "public"."user_course_test_options_test_option"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7a08dc33bc15f51e07383d1fc0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_069b326cff8f6dcf402c3ccca6"`);
        await queryRunner.query(`DROP TABLE "public"."course_categories_category"`);
        await queryRunner.query(`DROP INDEX "public"."certificate_file_name_uindex"`);
        await queryRunner.query(`DROP INDEX "public"."certificate_pk"`);
        await queryRunner.query(`DROP TABLE "public"."certificate"`);
        await queryRunner.query(`DROP INDEX "public"."user_course_pk"`);
        await queryRunner.query(`DROP TABLE "public"."user_course"`);
        await queryRunner.query(`DROP TYPE "public"."user_course_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."course_pk"`);
        await queryRunner.query(`DROP INDEX "public"."course_name_uindex"`);
        await queryRunner.query(`DROP TABLE "public"."course"`);
        await queryRunner.query(`DROP INDEX "public"."media_file_name_uindex"`);
        await queryRunner.query(`DROP INDEX "public"."media_pk"`);
        await queryRunner.query(`DROP TABLE "public"."media"`);
        await queryRunner.query(`DROP INDEX "public"."users_email_uindex"`);
        await queryRunner.query(`DROP INDEX "public"."users_pk"`);
        await queryRunner.query(`DROP TABLE "public"."users"`);
        await queryRunner.query(`DROP INDEX "public"."lesson_material_pk"`);
        await queryRunner.query(`DROP TABLE "public"."lesson_material"`);
        await queryRunner.query(`DROP TYPE "public"."lesson_material_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."test_pk"`);
        await queryRunner.query(`DROP TABLE "public"."test"`);
        await queryRunner.query(`DROP INDEX "public"."test_option_pk"`);
        await queryRunner.query(`DROP TABLE "public"."test_option"`);
        await queryRunner.query(`DROP INDEX "public"."text_content_pk"`);
        await queryRunner.query(`DROP TABLE "public"."text_content"`);
        await queryRunner.query(`DROP INDEX "public"."lesson_pk"`);
        await queryRunner.query(`DROP TABLE "public"."lesson"`);
        await queryRunner.query(`DROP INDEX "public"."course_category_pk"`);
        await queryRunner.query(`DROP INDEX "public"."course_category_name_uindex"`);
        await queryRunner.query(`DROP TABLE "public"."category"`);
    }

}
