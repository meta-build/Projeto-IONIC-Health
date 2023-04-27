import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1682172317176 implements MigrationInterface {
    name = 'Default1682172317176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`grupo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`attachment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fileName\` varchar(255) NOT NULL, \`fileType\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`storageType\` varchar(255) NOT NULL, \`ticketId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD \`id_grupo\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD UNIQUE INDEX \`IDX_163674a47d31977a7a7824ff2d\` (\`id_grupo\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_163674a47d31977a7a7824ff2d\` ON \`usuario\` (\`id_grupo\`)`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD CONSTRAINT \`fk_id_grupo_usuario\` FOREIGN KEY (\`id_grupo\`) REFERENCES \`grupo\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_60b41d083b908cacf03ca2d4416\` FOREIGN KEY (\`ticketId\`) REFERENCES \`solicitacao\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_60b41d083b908cacf03ca2d4416\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP FOREIGN KEY \`fk_id_grupo_usuario\``);
        await queryRunner.query(`DROP INDEX \`REL_163674a47d31977a7a7824ff2d\` ON \`usuario\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP INDEX \`IDX_163674a47d31977a7a7824ff2d\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`id_grupo\``);
        await queryRunner.query(`DROP TABLE \`attachment\``);
        await queryRunner.query(`DROP TABLE \`grupo\``);
    }

}
