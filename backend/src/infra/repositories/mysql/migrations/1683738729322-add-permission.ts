import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPermission1683738729322 implements MigrationInterface {
    name = 'AddPermission1683738729322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`permissionName\` varchar(255) NOT NULL, \`humanizedPermissionName\` varchar(255) NOT NULL, \`entity\` varchar(255) NOT NULL, \`humanizedEntity\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`permission\``);
    }

}
