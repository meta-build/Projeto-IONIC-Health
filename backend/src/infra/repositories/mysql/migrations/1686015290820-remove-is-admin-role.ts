import { MigrationInterface, QueryRunner } from 'typeorm'

export class RemoveIsAdminRole1686015290820 implements MigrationInterface {
  name = 'RemoveIsAdminRole1686015290820'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`isAdmin\``)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`role\` ADD \`isAdmin\` tinyint NOT NULL DEFAULT '0'`
    )
  }
}
