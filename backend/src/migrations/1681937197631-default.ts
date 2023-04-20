import { MigrationInterface, QueryRunner } from "typeorm";

export class default1681937197631 implements MigrationInterface {
    name = 'default1681937197631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`usuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`mail\` varchar(70) NOT NULL, \`password\` varchar(250) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notificacao\` (\`id\` int NOT NULL AUTO_INCREMENT, \`texto\` varchar(250) NULL, \`data_hora\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id_user\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`solicitacao\` (\`id\` int NOT NULL AUTO_INCREMENT, \`titulo\` varchar(100) NOT NULL, \`tipo\` varchar(100) NOT NULL, \`descricao\` varchar(150) NULL, \`data_criacao\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`data_arquivado\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id_user\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`notificacao\` ADD CONSTRAINT \`fk_id_user\` FOREIGN KEY (\`id_user\`) REFERENCES \`usuario\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`solicitacao\` ADD CONSTRAINT \`fk_id_user_solicitacao\` FOREIGN KEY (\`id_user\`) REFERENCES \`usuario\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`solicitacao\` DROP FOREIGN KEY \`fk_id_user_solicitacao\``);
        await queryRunner.query(`ALTER TABLE \`notificacao\` DROP FOREIGN KEY \`fk_id_user\``);
        await queryRunner.query(`DROP TABLE \`solicitacao\``);
        await queryRunner.query(`DROP TABLE \`notificacao\``);
        await queryRunner.query(`DROP TABLE \`usuario\``);
    }

}
