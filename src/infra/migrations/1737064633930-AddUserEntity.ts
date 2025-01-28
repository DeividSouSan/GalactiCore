import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserEntity1737064633930 implements MigrationInterface {
    name = 'AddUserEntity1737064633930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL, UNIQUE INDEX \`IDX_f4ca2c1e7c96ae6e8a7cca9df8\` (\`email\`, \`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_f4ca2c1e7c96ae6e8a7cca9df8\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);

    }

}
