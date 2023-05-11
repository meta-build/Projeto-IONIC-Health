import { MigrationInterface, QueryRunner } from "typeorm";

export class default1680570550976 implements MigrationInterface {
    name = 'default1680570550976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nomeSolicitacao\` varchar(100) NOT NULL, \`tipoSolicitacao\` varchar(70) NOT NULL, \`solicitante\` varchar(70) NULL, \`verificaSolicitacao\` tinyint NULL, \`arquivar\` tinyint NULL, UNIQUE INDEX \`IDX_687ad4bf6f4116a7d3b3bf8c9a\` (\`nomeSolicitacao\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_687ad4bf6f4116a7d3b3bf8c9a\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
