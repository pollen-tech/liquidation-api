import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductVariantsTable1729058085343 implements MigrationInterface {
    name = 'CreateProductVariantsTable1729058085343';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                CREATE TABLE product_variant_option
                (
                    id         uuid                 DEFAULT uuid_generate_v4() primary key,
                    product_id uuid        not null,
                    options    text,
                    created_at timestamp without time zone NOT NULL DEFAULT now(),
                    updated_at timestamp without time zone NOT NULL DEFAULT now(),
                    updated_on bigint,
                    status     varchar(25) not null DEFAULT 'NA',
                    CONSTRAINT fk_product_variant_option_product_id FOREIGN KEY (product_id) REFERENCES product (id)
                );
                CREATE INDEX IF NOT EXISTS idx_product_variant_option_updated_on ON product_variant_option(updated_on);
                CREATE UNIQUE INDEX IF NOT EXISTS idx_uq_product_variant_option_product_id ON product_variant_option(product_id);
            `,
        );

        await queryRunner.query(
            `
                  DROP SEQUENCE IF EXISTS product_variant_sku_seq_no  ;
                  CREATE SEQUENCE product_variant_sku_seq_no
                  INCREMENT BY 1
                  START WITH 1000
                  MINVALUE 1000
                  NO MAXVALUE
                  CACHE 1
                  CYCLE; 
                  `,
        );

        await queryRunner.query(
            `
                CREATE TABLE product_variant
                (
                    id          uuid                 DEFAULT uuid_generate_v4() primary key,
                    variant_sku varchar(25)          DEFAULT 'V' || nextval('product_variant_sku_seq_no'),
                    product_id  uuid        not null,
                    sku         varchar(25) not null DEFAULT 'NA',
                    image       varchar(150),
                    type        varchar(100),
                    color       varchar(100),
                    size        varchar(100),
                    user_id     uuid,
                    user_name   varchar(100),
                    created_at  timestamp without time zone NOT NULL DEFAULT now(),
                    updated_at  timestamp without time zone NOT NULL DEFAULT now(),
                    updated_on  bigint,
                    status      varchar(25) not null DEFAULT 'NA',
                    CONSTRAINT fk_product_variant_product_id FOREIGN KEY (product_id) REFERENCES product (id)
                );
                CREATE INDEX IF NOT EXISTS idx_product_variant_product_id ON product_variant(product_id);
                CREATE UNIQUE INDEX IF NOT EXISTS idx_uq_product_variant_variant_sku ON product_variant(variant_sku);
                CREATE INDEX IF NOT EXISTS idx_product_variant_updated_on ON product_variant(updated_on);
            `,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE product_variant;`);
        await queryRunner.query(`DROP TABLE product_variant_option;`);
    }
}
