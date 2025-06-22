import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1750593375412 implements MigrationInterface {
    name = 'CreateUserTable1750593375412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`content\` \`content\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`content\` \`content\` varchar(255) NULL DEFAULT 'NULL'`);
    }

}
