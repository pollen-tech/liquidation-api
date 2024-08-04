import { MigrationInterface, QueryRunner } from 'typeorm';

console.log('CurrentTime to append in filename : ' + Date.now());

export class CreateUserTables1720923244086 implements MigrationInterface {
    name = 'CreateUserTables1720923244086';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

        await queryRunner.query(
            `
                CREATE TABLE users
                (
                    id             uuid                  DEFAULT uuid_generate_v4() primary key,
                    pollen_pass_id int                   default 0,
                    first_name     varchar(50),
                    last_name      varchar(50),
                    country_code   int                   default 0,
                    phone_no       int                   default 0,
                    phone_verified boolean      not null DEFAULT false,
                    email          varchar(200) not null,
                    auth_ref_id    varchar(100)          DEFAULT 'NA',
                    auth_id        varchar(50)           DEFAULT 'NA',
                    channel        varchar(30)  not null DEFAULT 'NA',
                    status         varchar(25)  not null DEFAULT 'NA',
                    created_at     timestamp    not null DEFAULT now(),
                    updated_at     timestamp    not null DEFAULT now(),
                    deleted_at     timestamp without time zone, 
                    CONSTRAINT uq_users_auth_id_channel UNIQUE (auth_id, channel)
                );
               CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
            `,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE auth_user;`);
    }
}
