import { MigrationInterface, QueryRunner } from "typeorm"

export class AddRolesAndAdmin1682801618774 implements MigrationInterface {
	name = 'AddRolesAndAdmin1682801618774'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			INSERT INTO role (name)
			VALUES ('ADMIN'), ('REQUESTER')
		`);

		await queryRunner.query(`
			INSERT INTO user (name, email, password, roleId)
			VALUES ('Admin', 'admin@admin.com', '123456', 1)
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			DELETE FROM role
			WHERE name IN ('ADMIN', 'REQUESTER')
		`);

		await queryRunner.query(`
			DELETE FROM user
			WHERE email = 'admin@admin.com'
		`);

	}

}
