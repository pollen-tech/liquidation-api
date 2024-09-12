import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBrandTable1725965919557 implements MigrationInterface {
    name = 'CreateBrandTable1725965919557'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(
            `
                CREATE TABLE brands
                (
                    id         uuid                  DEFAULT uuid_generate_v4() primary key,
                    seq_no     integer               default 0,
                    brand_name       varchar(100) NOT NULL,
                    brand_image      varchar(100), 
                    created_at timestamp without time zone NOT NULL DEFAULT now(),
                    updated_at timestamp without time zone NOT NULL DEFAULT now(),
                    deleted_at timestamp without time zone,
                    updated_on bigint,
                    status     varchar(25)  not null DEFAULT 'NA'
                );
            `,
        );

        await queryRunner.query(
            `
                CREATE TABLE brand_category
                (
                    id                uuid               DEFAULT uuid_generate_v4() primary key,
                    brand_id          uuid               NOT NULL,
                    category_id       smallint           default 0,
                    category_name     varchar(100)       default 'NA',
                    sub_category_id   smallint           default 0,
                    sub_category_name varchar(100)       default 'NA',
                    created_at timestamp without time zone NOT NULL DEFAULT now(),
                    updated_at timestamp without time zone NOT NULL DEFAULT now(),
                    deleted_at timestamp without time zone,
                    updated_on bigint,
                    status     varchar(25)  not null DEFAULT 'NA',
                    CONSTRAINT fk_brand_category_brand_id FOREIGN KEY (brand_id) REFERENCES brands(id)
                );
                CREATE INDEX IF NOT EXISTS idx_brand_category_brand_id ON brand_category(brand_id)
            `,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE brands;`);

        await queryRunner.query(`DROP TABLE brand_category;`);
    }

}
