import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusDateToTicket1685750295851 implements MigrationInterface {
    name = 'AddStatusDateToTicket1685750295851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD \`statusNewAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD \`statusOnHoldingAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD \`statusDoneAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD \`statusRatingAt\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP COLUMN \`statusRatingAt\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP COLUMN \`statusDoneAt\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP COLUMN \`statusOnHoldingAt\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP COLUMN \`statusNewAt\``);
    }

}
