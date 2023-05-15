import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1683388744891 implements MigrationInterface {
    name = 'Default1683388744891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`attachment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fileName\` varchar(255) NOT NULL, \`fileType\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`storageType\` varchar(255) NOT NULL, \`ticketId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`solicitacao\` (\`id\` int NOT NULL AUTO_INCREMENT, \`titulo\` varchar(100) NOT NULL, \`tipo\` varchar(100) NOT NULL, \`descricao\` varchar(150) NULL, \`data_criacao\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`data_edicao\` datetime NULL, \`data_arquivado\` datetime NULL, \`id_user\` int NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'NEW', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rating\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` int NOT NULL, \`committee\` varchar(255) NOT NULL, \`comment\` varchar(255) NOT NULL, \`userId\` int NOT NULL, \`ticketId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`mail\` varchar(70) NOT NULL, \`password\` varchar(250) NOT NULL, \`grupoId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`grupo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notificacao\` (\`id\` int NOT NULL AUTO_INCREMENT, \`texto\` varchar(250) NULL, \`data_hora\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id_user\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_60b41d083b908cacf03ca2d4416\` FOREIGN KEY (\`ticketId\`) REFERENCES \`solicitacao\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`solicitacao\` ADD CONSTRAINT \`fk_id_user_solicitacao\` FOREIGN KEY (\`id_user\`) REFERENCES \`usuario\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rating\` ADD CONSTRAINT \`FK_a6c53dfc89ba3188b389ef29a62\` FOREIGN KEY (\`userId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rating\` ADD CONSTRAINT \`FK_cd057222334243e3ef3486011cc\` FOREIGN KEY (\`ticketId\`) REFERENCES \`solicitacao\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD CONSTRAINT \`FK_db32910efad9dce9fbce417338a\` FOREIGN KEY (\`grupoId\`) REFERENCES \`grupo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notificacao\` ADD CONSTRAINT \`fk_id_user\` FOREIGN KEY (\`id_user\`) REFERENCES \`usuario\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notificacao\` DROP FOREIGN KEY \`fk_id_user\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP FOREIGN KEY \`FK_db32910efad9dce9fbce417338a\``);
        await queryRunner.query(`ALTER TABLE \`rating\` DROP FOREIGN KEY \`FK_cd057222334243e3ef3486011cc\``);
        await queryRunner.query(`ALTER TABLE \`rating\` DROP FOREIGN KEY \`FK_a6c53dfc89ba3188b389ef29a62\``);
        await queryRunner.query(`ALTER TABLE \`solicitacao\` DROP FOREIGN KEY \`fk_id_user_solicitacao\``);
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_60b41d083b908cacf03ca2d4416\``);
        await queryRunner.query(`DROP TABLE \`notificacao\``);
        await queryRunner.query(`DROP TABLE \`grupo\``);
        await queryRunner.query(`DROP TABLE \`usuario\``);
        await queryRunner.query(`DROP TABLE \`rating\``);
        await queryRunner.query(`DROP TABLE \`solicitacao\``);
        await queryRunner.query(`DROP TABLE \`attachment\``);
    }

}
