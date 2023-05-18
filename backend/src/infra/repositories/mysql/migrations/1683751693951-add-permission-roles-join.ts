import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPermissionRolesJoin1683751693951 implements MigrationInterface {
    name = 'AddPermissionRolesJoin1683751693951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role_permission\` (\`permissionId\` int NOT NULL, \`roleId\` int NOT NULL, INDEX \`IDX_72e80be86cab0e93e67ed1a7a9\` (\`permissionId\`), INDEX \`IDX_e3130a39c1e4a740d044e68573\` (\`roleId\`), PRIMARY KEY (\`permissionId\`, \`roleId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`role_permission\` ADD CONSTRAINT \`FK_72e80be86cab0e93e67ed1a7a9a\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`role_permission\` ADD CONSTRAINT \`FK_e3130a39c1e4a740d044e685730\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role_permission\` DROP FOREIGN KEY \`FK_e3130a39c1e4a740d044e685730\``);
        await queryRunner.query(`ALTER TABLE \`role_permission\` DROP FOREIGN KEY \`FK_72e80be86cab0e93e67ed1a7a9a\``);
        await queryRunner.query(`DROP INDEX \`IDX_e3130a39c1e4a740d044e68573\` ON \`role_permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_72e80be86cab0e93e67ed1a7a9\` ON \`role_permission\``);
        await queryRunner.query(`DROP TABLE \`role_permission\``);
    }

}
