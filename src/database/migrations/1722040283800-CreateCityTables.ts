import { MigrationInterface, QueryRunner } from 'typeorm';

console.log('CurrentTime to append in filename : ' + Date.now());

export class CreateCityTables1722040283800 implements MigrationInterface {
    name = 'CreateCityTables1722040283800';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                CREATE TABLE city
                (
                    id         int primary key,
                    name       varchar(100) NOT NULL,
                    country_id int                   default 0,
                    created_at timestamp without time zone NOT NULL DEFAULT now(),
                    updated_at timestamp without time zone NOT NULL DEFAULT now(),
                    status     varchar(25)  not null DEFAULT 'NA',
                    CONSTRAINT fk_city_country_id FOREIGN KEY (country_id) REFERENCES country (id)
                );
                CREATE INDEX IF NOT EXISTS idx_city_country_id ON city(country_id);
            `,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE city;`);
    }
}
