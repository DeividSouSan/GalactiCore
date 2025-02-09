import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1738878624522 implements MigrationInterface {
    name = "CreateTables1738878624522";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`planet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`weather\` varchar(255) NOT NULL, \`terrain\` varchar(255) NOT NULL, \`population\` int NOT NULL, \`stellarSystemId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`stellar_system\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_e86c3c2ccdd88b9998bbacb859\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`character\` (\`id\` int NOT NULL AUTO_INCREMENT, \`race\` varchar(255) NOT NULL, \`affiliation\` enum ('Jedi', 'Sith', 'Rebel') NOT NULL DEFAULT 'Jedi', \`homePlanetId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`spaceship\` (\`id\` int NOT NULL AUTO_INCREMENT, \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`capacity\` int NOT NULL, UNIQUE INDEX \`IDX_eb821088410ce02088b7409b39\` (\`model\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL, UNIQUE INDEX \`IDX_f4ca2c1e7c96ae6e8a7cca9df8\` (\`email\`, \`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`planet\` ADD CONSTRAINT \`FK_fe60c305a5762deb754ab721800\` FOREIGN KEY (\`stellarSystemId\`) REFERENCES \`stellar_system\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`character\` ADD CONSTRAINT \`FK_d5ea5438b45d548d644e800b98f\` FOREIGN KEY (\`homePlanetId\`) REFERENCES \`planet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`character\` DROP FOREIGN KEY \`FK_d5ea5438b45d548d644e800b98f\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`planet\` DROP FOREIGN KEY \`FK_fe60c305a5762deb754ab721800\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_f4ca2c1e7c96ae6e8a7cca9df8\` ON \`user\``,
        );
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(
            `DROP INDEX \`IDX_eb821088410ce02088b7409b39\` ON \`spaceship\``,
        );
        await queryRunner.query(`DROP TABLE \`spaceship\``);
        await queryRunner.query(`DROP TABLE \`character\``);
        await queryRunner.query(
            `DROP INDEX \`IDX_e86c3c2ccdd88b9998bbacb859\` ON \`stellar_system\``,
        );
        await queryRunner.query(`DROP TABLE \`stellar_system\``);
        await queryRunner.query(`DROP TABLE \`planet\``);
    }
}
