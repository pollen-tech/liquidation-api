import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductsTables1726134673075 implements MigrationInterface {
    name = 'CreateProductsTables1726134673075'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(
            `
                CREATE TABLE product
                (
                    id         uuid                  DEFAULT uuid_generate_v4() primary key,
                    seq_no     integer               default 1,
                    pollen_sku varchar      not null DEFAULT 'NA',
                    sku        varchar      not null DEFAULT 'NA',
                    brand_id   uuid         NOT NULL,
                    name       varchar(200) NOT NULL,
                    image      varchar(100),
                    created_at timestamp without time zone NOT NULL DEFAULT now(),
                    updated_at timestamp without time zone NOT NULL DEFAULT now(),
                    updated_on bigint,
                    status     varchar(25)  not null DEFAULT 'NA',
                    CONSTRAINT fk_product_brand_id FOREIGN KEY (brand_id) REFERENCES brand (id)
                );
                CREATE INDEX IF NOT EXISTS idx_product_updated_on ON product(updated_on);
                CREATE SEQUENCE seq_no_sequence_product
                    START WITH 1 
                    INCREMENT BY 1;

                ALTER TABLE product ALTER COLUMN seq_no SET DEFAULT nextval('seq_no_sequence_product');
            `,
        );

        await queryRunner.query(
            `
                CREATE TABLE product_category
                (
                    id                uuid                 DEFAULT uuid_generate_v4() primary key,
                    product_id        uuid                 NOT NULL,
                    category_id       smallint             default 0,
                    category_name     varchar(100)         default 'NA',
                    sub_category_id   smallint             default 0,
                    sub_category_name varchar(100)         default 'NA',
                    sub_category_description varchar(200)  default 'NA',
                    created_at        timestamp without time zone NOT NULL DEFAULT now(),
                    updated_at        timestamp without time zone NOT NULL DEFAULT now(),
                    updated_on        bigint,
                    status            varchar(25) not null DEFAULT 'NA',
                    CONSTRAINT fk_product_category_product_id FOREIGN KEY (product_id) REFERENCES product (id)
                );
                CREATE INDEX IF NOT EXISTS idx_brand_category_product_id ON product_category(product_id);
                CREATE INDEX IF NOT EXISTS idx_product_category_updated_on ON product_category(updated_on);
            `,
        );

        await queryRunner.query(
            `
                CREATE TABLE user_product
                (
                    id         uuid                 DEFAULT uuid_generate_v4() primary key,
                    user_id    uuid        NOT NULL,
                    product_id uuid        NOT NULL,
                    created_at timestamp without time zone NOT NULL DEFAULT now(),
                    updated_at timestamp without time zone NOT NULL DEFAULT now(),
                    updated_on bigint,
                    status     varchar(25) not null DEFAULT 'NA',
                    CONSTRAINT fk_user_product_product_id FOREIGN KEY (product_id) REFERENCES product (id)
                );
                CREATE INDEX IF NOT EXISTS idx_user_product_user_id ON user_product(user_id);
                CREATE INDEX IF NOT EXISTS idx_user_product_updated_on ON user_product(updated_on);
            `,
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE user_product;`);
        await queryRunner.query(`DROP TABLE product_category;`);
        await queryRunner.query(`DROP TABLE product;`);
    }

}
