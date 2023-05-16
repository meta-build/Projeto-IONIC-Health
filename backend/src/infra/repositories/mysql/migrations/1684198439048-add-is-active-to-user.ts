import { MigrationInterface, QueryRunner } from "typeorm"

export class AddIsActiveToUser1684198439048 implements MigrationInterface {
	name = 'AddIsActiveToUser1684198439048'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE \`user\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`);
		await queryRunner.query(`ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_f9002053a90b58005055e41e86d\``);
		await queryRunner.query(`ALTER TABLE \`ticket\` CHANGE \`assignedRoleId\` \`assignedRoleId\` int NOT NULL`);
		await queryRunner.query(`ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_f9002053a90b58005055e41e86d\` FOREIGN KEY (\`assignedRoleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_f9002053a90b58005055e41e86d\``);
		await queryRunner.query(`ALTER TABLE \`ticket\` CHANGE \`assignedRoleId\` \`assignedRoleId\` int NULL`);
		await queryRunner.query(`ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_f9002053a90b58005055e41e86d\` FOREIGN KEY (\`assignedRoleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
		await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isActive\``);
	}
}
