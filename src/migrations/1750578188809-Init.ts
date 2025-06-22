import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1750578188809 implements MigrationInterface {
    name = 'Init1750578188809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`content\` \`content\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`content\` \`content\` varchar(255) NULL DEFAULT 'NULL'`);
    }

}
