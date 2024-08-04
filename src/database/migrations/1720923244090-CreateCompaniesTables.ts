import { MigrationInterface, QueryRunner } from 'typeorm';

console.log('CurrentTime to append in filename : ' + Date.now());

export class CreateCompaniesTables1720923244086 implements MigrationInterface {
    name = 'CreateCompaniesTables1720923244086';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                CREATE TABLE country
                (
                    id         int primary key,
                    name       varchar(100) NOT NULL,
                    iso3       varchar(10)  NOT NULL,
                    phone_code varchar(10)  NOT NULL,
                    created_at timestamp without time zone NOT NULL DEFAULT now(),
                    updated_at timestamp without time zone NOT NULL DEFAULT now(),
                    status     varchar(25)  not null DEFAULT 'NA'
                );
            `,
        );

        await queryRunner.query(
            `
                CREATE TABLE company_type
                (
                    id          smallint primary key,
                    name        varchar(100) NOT NULL,
                    description varchar(250) NOT NULL,
                    status      varchar(25)  not null DEFAULT 'NA'
                );
            `,
        );

        await queryRunner.query(
            `
                CREATE TABLE liquidate_unit
                (
                    id          smallint primary key,
                    name        varchar(100) NOT NULL,
                    description varchar(250) NOT NULL,
                    status      varchar(25)  not null DEFAULT 'NA'
                );
            `,
        );

        await queryRunner.query(
            `
                CREATE TABLE company
                (
                    id                  uuid                  DEFAULT uuid_generate_v4() primary key,
                    account_id          integer               default 0,
                    name                varchar(100) NOT NULL,
                    company_type_id     smallint              default 0,
                    country_id          int                   default 0,
                    country_name        varchar(100) NOT NULL default 'NA',
                    liquidate_unit_id   smallint              default 0,
                    liquidate_unit_name varchar(100)          default 'NA',
                    created_at          timestamp without time zone NOT NULL DEFAULT now(),
                    updated_at          timestamp without time zone NOT NULL DEFAULT now(),
                    deleted_at          timestamp without time zone,
                    status              varchar(25)  not null DEFAULT 'NA',
                    CONSTRAINT uq_company_name UNIQUE (name),
                    CONSTRAINT fk_company_company_type_id FOREIGN KEY (company_type_id) REFERENCES company_type (id),
                    CONSTRAINT fk_company_liquidate_unit_id FOREIGN KEY (liquidate_unit_id) REFERENCES liquidate_unit (id)
                );
            `,
        );
        await queryRunner.query(
            `
                CREATE TABLE company_user
                (
                    id         uuid                 DEFAULT uuid_generate_v4() primary key,
                    company_id uuid        NOT NULL,
                    user_id    uuid        NOT NULL,
                    status     varchar(25) not null DEFAULT 'NA',
                    created_at timestamp without time zone NOT NULL DEFAULT now(),
                    updated_at timestamp without time zone NOT NULL DEFAULT now(),
                    deleted_at timestamp without time zone,
                    CONSTRAINT fk_company_user_company_id FOREIGN KEY (company_id) REFERENCES company (id)
                );
            `,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE company_user;`);

        await queryRunner.query(`DROP TABLE company;`);

        await queryRunner.query(`DROP TABLE company_types;`);

        await queryRunner.query(`DROP TABLE liquidate_unit;`);
    }
}
