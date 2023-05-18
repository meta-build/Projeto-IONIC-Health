import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateAdminRole1683813676591 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			UPDATE role SET isAdmin = true WHERE name = 'ADMIN'
		`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			UPDATE role SET isAdmin = false WHERE name = 'ADMIN'
		`)
	}
}
