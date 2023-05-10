import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPermissionRolesJoin1683751693951 implements MigrationInterface {
    name = 'AddPermissionRolesJoin1683751693951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permission_roles_role\` (\`permissionId\` int NOT NULL, \`roleId\` int NOT NULL, INDEX \`IDX_9f44b6228b173c7b9dfb8c6600\` (\`permissionId\`), INDEX \`IDX_7ec93d4fbf75b063f3ffd2646a\` (\`roleId\`), PRIMARY KEY (\`permissionId\`, \`roleId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role_permissions_permission\` (\`roleId\` int NOT NULL, \`permissionId\` int NOT NULL, INDEX \`IDX_b36cb2e04bc353ca4ede00d87b\` (\`roleId\`), INDEX \`IDX_bfbc9e263d4cea6d7a8c9eb3ad\` (\`permissionId\`), PRIMARY KEY (\`roleId\`, \`permissionId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`permission_roles_role\` ADD CONSTRAINT \`FK_9f44b6228b173c7b9dfb8c66003\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`permission_roles_role\` ADD CONSTRAINT \`FK_7ec93d4fbf75b063f3ffd2646a5\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`role_permissions_permission\` ADD CONSTRAINT \`FK_b36cb2e04bc353ca4ede00d87b9\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`role_permissions_permission\` ADD CONSTRAINT \`FK_bfbc9e263d4cea6d7a8c9eb3ad2\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role_permissions_permission\` DROP FOREIGN KEY \`FK_bfbc9e263d4cea6d7a8c9eb3ad2\``);
        await queryRunner.query(`ALTER TABLE \`role_permissions_permission\` DROP FOREIGN KEY \`FK_b36cb2e04bc353ca4ede00d87b9\``);
        await queryRunner.query(`ALTER TABLE \`permission_roles_role\` DROP FOREIGN KEY \`FK_7ec93d4fbf75b063f3ffd2646a5\``);
        await queryRunner.query(`ALTER TABLE \`permission_roles_role\` DROP FOREIGN KEY \`FK_9f44b6228b173c7b9dfb8c66003\``);
        await queryRunner.query(`DROP INDEX \`IDX_bfbc9e263d4cea6d7a8c9eb3ad\` ON \`role_permissions_permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_b36cb2e04bc353ca4ede00d87b\` ON \`role_permissions_permission\``);
        await queryRunner.query(`DROP TABLE \`role_permissions_permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_7ec93d4fbf75b063f3ffd2646a\` ON \`permission_roles_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_9f44b6228b173c7b9dfb8c6600\` ON \`permission_roles_role\``);
        await queryRunner.query(`DROP TABLE \`permission_roles_role\``);
    }

}
