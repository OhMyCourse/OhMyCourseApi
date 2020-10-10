import {MigrationInterface, QueryRunner} from "typeorm";

export class ConstraintMigration1602349223563 implements MigrationInterface {
    name = 'ConstraintMigration1602349223563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_360a7cb022c9d75eb69a3a0334d"`);
        await queryRunner.query(`ALTER TABLE "test_option" DROP CONSTRAINT "FK_780ad48958f3d2882cd51f07471"`);
        await queryRunner.query(`ALTER TABLE "lesson_material" DROP CONSTRAINT "FK_665d6e53f41c21fa694d6eb6b90"`);
        await queryRunner.query(`ALTER TABLE "lesson_material" DROP CONSTRAINT "FK_14237286cb05699137539d24bdc"`);
        await queryRunner.query(`ALTER TABLE "lesson_material" DROP CONSTRAINT "FK_c6d450882fe6714d2e925e428cb"`);
        await queryRunner.query(`ALTER TABLE "lesson_material" DROP CONSTRAINT "FK_6dea05e964b938261460b61521d"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_cd05eb25f03b90e425b3780d149"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_1ed87f4591e1834fa3666b11d4e"`);
        await queryRunner.query(`ALTER TABLE "user_course" DROP CONSTRAINT "FK_e2b1e2fc60af9130744ccf4df8c"`);
        await queryRunner.query(`ALTER TABLE "user_course" DROP CONSTRAINT "FK_9e48be498cd90f39f96bfa1ea79"`);
        await queryRunner.query(`ALTER TABLE "certificate" DROP CONSTRAINT "FK_b4421b7fa4c4467c54b691e97b1"`);
        await queryRunner.query(`ALTER TABLE "course_categories_category" DROP CONSTRAINT "FK_069b326cff8f6dcf402c3ccca6c"`);
        await queryRunner.query(`ALTER TABLE "course_categories_category" DROP CONSTRAINT "FK_7a08dc33bc15f51e07383d1fc0d"`);
        await queryRunner.query(`ALTER TABLE "user_course_test_options_test_option" DROP CONSTRAINT "FK_9a5b257bf9ac8bbc9744143f637"`);
        await queryRunner.query(`ALTER TABLE "user_course_test_options_test_option" DROP CONSTRAINT "FK_32846081c4de14387b1a8124940"`);
        await queryRunner.query(`DROP INDEX "IDX_7a08dc33bc15f51e07383d1fc0"`);
        await queryRunner.query(`DROP INDEX "IDX_069b326cff8f6dcf402c3ccca6"`);
        await queryRunner.query(`DROP INDEX "IDX_9a5b257bf9ac8bbc9744143f63"`);
        await queryRunner.query(`DROP INDEX "IDX_32846081c4de14387b1a812494"`);
        await queryRunner.query(`CREATE INDEX "IDX_5c816c082df054a20c4df50f76" ON "course_categories_category" ("course_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a46d73cdebade5858b8696d6e4" ON "course_categories_category" ("category_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a4ec0d6657ab3bb1160ff20252" ON "user_course_test_options_test_option" ("user_course_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_2541d6876b6c50d895e9a0c81f" ON "user_course_test_options_test_option" ("test_option_id") `);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_5b2678a83db14ed1bfe89de5774" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_option" ADD CONSTRAINT "FK_3dbe480053ad24ec70b256a5736" FOREIGN KEY ("test_id") REFERENCES "test"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lesson_material" ADD CONSTRAINT "FK_06eacade889219ccc4bd9c4d196" FOREIGN KEY ("lesson_id") REFERENCES "lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lesson_material" ADD CONSTRAINT "FK_1b641cfb8bc8bdd9285147a19d9" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson_material" ADD CONSTRAINT "FK_6eb4b5b36d550bd4361da2b534a" FOREIGN KEY ("test_id") REFERENCES "test"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson_material" ADD CONSTRAINT "FK_1a6eadac6a1ccf1b9e6668e729f" FOREIGN KEY ("text_content_id") REFERENCES "text_content"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_9c08bde4931ab78abb8729714a3" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_6b30e55915de5bb11a07460d8f0" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_course" ADD CONSTRAINT "FK_a17a0128f2f4fbb56ca04a07036" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_course" ADD CONSTRAINT "FK_8abb4cbd80ac598dbe7c4dd8ce2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "certificate" ADD CONSTRAINT "FK_357e037f7f980535e2ef536d580" FOREIGN KEY ("user_course_id") REFERENCES "user_course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_categories_category" ADD CONSTRAINT "FK_5c816c082df054a20c4df50f76c" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_categories_category" ADD CONSTRAINT "FK_a46d73cdebade5858b8696d6e47" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_course_test_options_test_option" ADD CONSTRAINT "FK_a4ec0d6657ab3bb1160ff20252f" FOREIGN KEY ("user_course_id") REFERENCES "user_course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_course_test_options_test_option" ADD CONSTRAINT "FK_2541d6876b6c50d895e9a0c81fa" FOREIGN KEY ("test_option_id") REFERENCES "test_option"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_course_test_options_test_option" DROP CONSTRAINT "FK_2541d6876b6c50d895e9a0c81fa"`);
        await queryRunner.query(`ALTER TABLE "user_course_test_options_test_option" DROP CONSTRAINT "FK_a4ec0d6657ab3bb1160ff20252f"`);
        await queryRunner.query(`ALTER TABLE "course_categories_category" DROP CONSTRAINT "FK_a46d73cdebade5858b8696d6e47"`);
        await queryRunner.query(`ALTER TABLE "course_categories_category" DROP CONSTRAINT "FK_5c816c082df054a20c4df50f76c"`);
        await queryRunner.query(`ALTER TABLE "certificate" DROP CONSTRAINT "FK_357e037f7f980535e2ef536d580"`);
        await queryRunner.query(`ALTER TABLE "user_course" DROP CONSTRAINT "FK_8abb4cbd80ac598dbe7c4dd8ce2"`);
        await queryRunner.query(`ALTER TABLE "user_course" DROP CONSTRAINT "FK_a17a0128f2f4fbb56ca04a07036"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_6b30e55915de5bb11a07460d8f0"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_9c08bde4931ab78abb8729714a3"`);
        await queryRunner.query(`ALTER TABLE "lesson_material" DROP CONSTRAINT "FK_1a6eadac6a1ccf1b9e6668e729f"`);
        await queryRunner.query(`ALTER TABLE "lesson_material" DROP CONSTRAINT "FK_6eb4b5b36d550bd4361da2b534a"`);
        await queryRunner.query(`ALTER TABLE "lesson_material" DROP CONSTRAINT "FK_1b641cfb8bc8bdd9285147a19d9"`);
        await queryRunner.query(`ALTER TABLE "lesson_material" DROP CONSTRAINT "FK_06eacade889219ccc4bd9c4d196"`);
        await queryRunner.query(`ALTER TABLE "test_option" DROP CONSTRAINT "FK_3dbe480053ad24ec70b256a5736"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_5b2678a83db14ed1bfe89de5774"`);
        await queryRunner.query(`DROP INDEX "IDX_2541d6876b6c50d895e9a0c81f"`);
        await queryRunner.query(`DROP INDEX "IDX_a4ec0d6657ab3bb1160ff20252"`);
        await queryRunner.query(`DROP INDEX "IDX_a46d73cdebade5858b8696d6e4"`);
        await queryRunner.query(`DROP INDEX "IDX_5c816c082df054a20c4df50f76"`);
        await queryRunner.query(`CREATE INDEX "IDX_32846081c4de14387b1a812494" ON "user_course_test_options_test_option" ("user_course_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9a5b257bf9ac8bbc9744143f63" ON "user_course_test_options_test_option" ("test_option_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_069b326cff8f6dcf402c3ccca6" ON "course_categories_category" ("course_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7a08dc33bc15f51e07383d1fc0" ON "course_categories_category" ("category_id") `);
        await queryRunner.query(`ALTER TABLE "user_course_test_options_test_option" ADD CONSTRAINT "FK_32846081c4de14387b1a8124940" FOREIGN KEY ("user_course_id") REFERENCES "user_course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_course_test_options_test_option" ADD CONSTRAINT "FK_9a5b257bf9ac8bbc9744143f637" FOREIGN KEY ("test_option_id") REFERENCES "test_option"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_categories_category" ADD CONSTRAINT "FK_7a08dc33bc15f51e07383d1fc0d" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_categories_category" ADD CONSTRAINT "FK_069b326cff8f6dcf402c3ccca6c" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "certificate" ADD CONSTRAINT "FK_b4421b7fa4c4467c54b691e97b1" FOREIGN KEY ("user_course_id") REFERENCES "user_course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_course" ADD CONSTRAINT "FK_9e48be498cd90f39f96bfa1ea79" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_course" ADD CONSTRAINT "FK_e2b1e2fc60af9130744ccf4df8c" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_1ed87f4591e1834fa3666b11d4e" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_cd05eb25f03b90e425b3780d149" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson_material" ADD CONSTRAINT "FK_6dea05e964b938261460b61521d" FOREIGN KEY ("text_content_id") REFERENCES "text_content"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson_material" ADD CONSTRAINT "FK_c6d450882fe6714d2e925e428cb" FOREIGN KEY ("test_id") REFERENCES "test"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson_material" ADD CONSTRAINT "FK_14237286cb05699137539d24bdc" FOREIGN KEY ("lesson_id") REFERENCES "lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lesson_material" ADD CONSTRAINT "FK_665d6e53f41c21fa694d6eb6b90" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_option" ADD CONSTRAINT "FK_780ad48958f3d2882cd51f07471" FOREIGN KEY ("test_id") REFERENCES "test"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_360a7cb022c9d75eb69a3a0334d" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
