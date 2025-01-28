import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1735745808431 implements MigrationInterface {
    name = 'CreateTables1735745808431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`planet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`weather\` varchar(255) NOT NULL, \`terrain\` varchar(255) NOT NULL, \`population\` int NOT NULL, \`stellarSystemId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`stellar_system\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`character\` (\`id\` int NOT NULL AUTO_INCREMENT, \`race\` varchar(255) NOT NULL, \`affiliation\` enum ('Jedi', 'Sith', 'Rebel') NOT NULL DEFAULT 'Jedi', \`homePlanetId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`spaceship\` (\`id\` int NOT NULL AUTO_INCREMENT, \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`capacity\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`planet\` ADD CONSTRAINT \`FK_fe60c305a5762deb754ab721800\` FOREIGN KEY (\`stellarSystemId\`) REFERENCES \`stellar_system\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`character\` ADD CONSTRAINT \`FK_d5ea5438b45d548d644e800b98f\` FOREIGN KEY (\`homePlanetId\`) REFERENCES \`planet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`character\` DROP FOREIGN KEY \`FK_d5ea5438b45d548d644e800b98f\``);
        await queryRunner.query(`ALTER TABLE \`planet\` DROP FOREIGN KEY \`FK_fe60c305a5762deb754ab721800\``);
        await queryRunner.query(`DROP TABLE \`spaceship\``);
        await queryRunner.query(`DROP TABLE \`character\``);
        await queryRunner.query(`DROP TABLE \`stellar_system\``);
        await queryRunner.query(`DROP TABLE \`planet\``);
    }

}
