import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterProductUserTable1729058089348 implements MigrationInterface {
    name = 'AlterProductUserTable1729058089348';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                ALTER TABLE user_product
                    ADD user_name varchar(150) DEFAULT 'NA';
            `,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE user_product DROP COLUMN user_name;`);
    }
}
