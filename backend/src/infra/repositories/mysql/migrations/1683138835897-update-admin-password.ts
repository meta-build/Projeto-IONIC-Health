import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateAdminPassword1683138835897 implements MigrationInterface {
  name = 'UpdateAdminPassword1683138835897'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			UPDATE user SET password = '$2b$12$oyOwwGFhKQqIpCoj0KXvc.b5JExtCCj0DozKC6NatFgH3U2qghCh2' WHERE email = 'admin@admin.com'
		`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			UPDATE user SET password = '123456' WHERE email = 'admin@admin.com'
		`)
	}
}
