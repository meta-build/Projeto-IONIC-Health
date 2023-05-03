import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateAdminPassword1683138835897 implements MigrationInterface {
  name = 'UpdateAdminPassword1683138835897'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			UPDATE user SET password = '$2b$12$f.g0xiLx8CmkK38QTH9ViOp0XTtmp2O0J5reuhnslqBQbc7liZT.O' WHERE email = 'admin@admin.com'
		`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			UPDATE user SET password = '123456' WHERE email = 'admin@admin.com'
		`)
	}
}
