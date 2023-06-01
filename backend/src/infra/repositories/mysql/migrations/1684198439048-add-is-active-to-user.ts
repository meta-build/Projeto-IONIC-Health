import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddIsActiveToUser1684198439048 implements MigrationInterface {
  name = 'AddIsActiveToUser1684198439048'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isActive\``)
  }
}
