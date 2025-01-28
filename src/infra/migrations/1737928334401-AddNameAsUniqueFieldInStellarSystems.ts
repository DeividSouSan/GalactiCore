import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNameAsUniqueFieldInStellarSystems1737928334401 implements MigrationInterface {
    name = 'AddNameAsUniqueFieldInStellarSystems1737928334401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`stellar_system\` ADD UNIQUE INDEX \`IDX_e86c3c2ccdd88b9998bbacb859\` (\`name\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`stellar_system\` DROP INDEX \`IDX_e86c3c2ccdd88b9998bbacb859\``);
    }

}
