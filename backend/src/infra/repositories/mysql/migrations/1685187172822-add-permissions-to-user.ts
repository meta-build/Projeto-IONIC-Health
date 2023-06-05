import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPermissionsToUser1685187172822 implements MigrationInterface {
  name = 'AddPermissionsToUser1685187172822'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`user_permission\` (\`userId\` int NOT NULL, \`permissionId\` int NOT NULL, INDEX \`IDX_deb59c09715314aed1866e18a8\` (\`userId\`), INDEX \`IDX_a592f2df24c9d464afd71401ff\` (\`permissionId\`), PRIMARY KEY (\`userId\`, \`permissionId\`)) ENGINE=InnoDB`);
    await queryRunner.query(`ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_f9002053a90b58005055e41e86d\``);
    await queryRunner.query(`ALTER TABLE \`ticket\` CHANGE \`assignedRoleId\` \`assignedRoleId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_f9002053a90b58005055e41e86d\` FOREIGN KEY (\`assignedRoleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE \`user_permission\` ADD CONSTRAINT \`FK_deb59c09715314aed1866e18a81\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE \`user_permission\` ADD CONSTRAINT \`FK_a592f2df24c9d464afd71401ff6\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user_permission\` DROP FOREIGN KEY \`FK_a592f2df24c9d464afd71401ff6\``);
    await queryRunner.query(`ALTER TABLE \`user_permission\` DROP FOREIGN KEY \`FK_deb59c09715314aed1866e18a81\``);
    await queryRunner.query(`ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_f9002053a90b58005055e41e86d\``);
    await queryRunner.query(`ALTER TABLE \`ticket\` CHANGE \`assignedRoleId\` \`assignedRoleId\` int NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_f9002053a90b58005055e41e86d\` FOREIGN KEY (\`assignedRoleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`DROP INDEX \`IDX_a592f2df24c9d464afd71401ff\` ON \`user_permission\``);
    await queryRunner.query(`DROP INDEX \`IDX_deb59c09715314aed1866e18a8\` ON \`user_permission\``);
    await queryRunner.query(`DROP TABLE \`user_permission\``);
  }
}
