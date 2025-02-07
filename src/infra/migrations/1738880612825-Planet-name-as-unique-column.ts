import { MigrationInterface, QueryRunner } from "typeorm";

export class PlanetNameAsUniqueColumn1738880612825 implements MigrationInterface {
    name = 'PlanetNameAsUniqueColumn1738880612825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`planet\` ADD UNIQUE INDEX \`IDX_0c6595b668a276b8482611a20e\` (\`name\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`planet\` DROP INDEX \`IDX_0c6595b668a276b8482611a20e\``);
    }

}
