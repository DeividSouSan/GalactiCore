import { MigrationInterface, QueryRunner } from "typeorm";

export class SpaceshipModelAsUniqueConstraint1736893900549 implements MigrationInterface {
    name = 'SpaceshipModelAsUniqueConstraint1736893900549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`spaceship\` ADD UNIQUE INDEX \`IDX_eb821088410ce02088b7409b39\` (\`model\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`spaceship\` DROP INDEX \`IDX_eb821088410ce02088b7409b39\``);
    }

}
