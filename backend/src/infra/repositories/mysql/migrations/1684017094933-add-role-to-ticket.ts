import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddRoleToTicket1684017094933 implements MigrationInterface {
  name = 'AddRoleToTicket1684017094933'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`ticket\` ADD \`isArchived\` tinyint NULL`
    )
    await queryRunner.query(
      `ALTER TABLE \`ticket\` ADD \`assignedRoleId\` int NULL`
    )
    await queryRunner.query(
      `ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_f9002053a90b58005055e41e86d\` FOREIGN KEY (\`assignedRoleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_f9002053a90b58005055e41e86d\``
    )
    await queryRunner.query(
      `ALTER TABLE \`ticket\` DROP COLUMN \`assignedRoleId\``
    )
    await queryRunner.query(`ALTER TABLE \`ticket\` DROP COLUMN \`isArchived\``)
  }
}
