import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1682281041840 implements MigrationInterface {
    name = 'Default1682281041840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`grupoId\` \`grupoId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`rating\` ADD CONSTRAINT \`FK_a6c53dfc89ba3188b389ef29a62\` FOREIGN KEY (\`userId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rating\` ADD CONSTRAINT \`FK_cd057222334243e3ef3486011cc\` FOREIGN KEY (\`ticketId\`) REFERENCES \`solicitacao\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD CONSTRAINT \`FK_db32910efad9dce9fbce417338a\` FOREIGN KEY (\`grupoId\`) REFERENCES \`grupo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP FOREIGN KEY \`FK_db32910efad9dce9fbce417338a\``);
        await queryRunner.query(`ALTER TABLE \`rating\` DROP FOREIGN KEY \`FK_cd057222334243e3ef3486011cc\``);
        await queryRunner.query(`ALTER TABLE \`rating\` DROP FOREIGN KEY \`FK_a6c53dfc89ba3188b389ef29a62\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`grupoId\` \`grupoId\` int NULL`);
    }

}
