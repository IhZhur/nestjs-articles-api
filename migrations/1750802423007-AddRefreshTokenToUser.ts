import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefreshTokenToUser1750799999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `user` ADD COLUMN `refreshToken` varchar(512) NULL"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `user` DROP COLUMN `refreshToken`"
    );
  }
}
