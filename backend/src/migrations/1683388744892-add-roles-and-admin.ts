import { MigrationInterface, QueryRunner } from "typeorm"

export class AddRolesAndAdmin1683388744892 implements MigrationInterface {
	name = 'AddRolesAndAdmin1683388744892'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			INSERT INTO grupo (name)
			VALUES ('ADMIN'), ('REQUESTER')
		`);

		await queryRunner.query(`
			INSERT INTO usuario (name, mail, password, grupoId)
			VALUES ('Admin', 'admin@admin.com', '123456', 1)
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			DELETE FROM grupo
			WHERE name IN ('ADMIN', 'REQUESTER')
		`);

		await queryRunner.query(`
			DELETE FROM usuario
			WHERE mail = 'admin@admin.com'
		`);

	}

}
