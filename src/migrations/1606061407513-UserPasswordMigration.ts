import { MigrationInterface, QueryRunner } from "typeorm";

export class UserPasswordMigration1606061407513 implements MigrationInterface {
    name = 'UserPasswordMigration1606061407513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(500) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
