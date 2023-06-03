import { MigrationInterface, QueryRunner } from "typeorm";

export class RatingStatus1685752482037 implements MigrationInterface {
    name = 'RatingStatus1685752482037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rating\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rating\` DROP COLUMN \`createdAt\``);
    }

}
