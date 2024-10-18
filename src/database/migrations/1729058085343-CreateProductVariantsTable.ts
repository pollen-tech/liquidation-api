import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateProductVariantsTable1729058085343 implements MigrationInterface {

    name = 'CreateProductVariantsTable1729058085343';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                CREATE TABLE product_variant_option
                (
                    id             uuid                 DEFAULT uuid_generate_v4() primary key,
                    product_id     uuid        not null,
                    variant_option text,
                    created_at     timestamp without time zone NOT NULL DEFAULT now(),
                    updated_at     timestamp without time zone NOT NULL DEFAULT now(),
                    updated_on     bigint,
                    status         varchar(25) not null DEFAULT 'NA',
                    CONSTRAINT fk_product_variant_option_product_id FOREIGN KEY (product_id) REFERENCES product (id)
                );
                CREATE INDEX IF NOT EXISTS idx_product_variant_option_updated_on ON product_variant_option(updated_on);
                CREATE UNIQUE INDEX IF NOT EXISTS idx_uq_product_variant_option_product_id ON product_variant_option(product_id);
            `,
        );

        await queryRunner.query(
            `
                CREATE TABLE product_variant
                (
                    id          uuid                 DEFAULT uuid_generate_v4() primary key,
                    product_id  uuid        not null,
                    variant_sku varchar(20) not null,
                    image       varchar(150),
                    type        varchar(100),
                    color       varchar(100),
                    size        varchar(100),
                    created_at  timestamp without time zone NOT NULL DEFAULT now(),
                    updated_at  timestamp without time zone NOT NULL DEFAULT now(),
                    updated_on  bigint,
                    status      varchar(25) not null DEFAULT 'NA',
                    CONSTRAINT fk_product_variant_product_id FOREIGN KEY (product_id) REFERENCES product (id)
                );
                CREATE INDEX IF NOT EXISTS idx_product_image_updated_on ON product_image(updated_on);
                CREATE UNIQUE INDEX IF NOT EXISTS idx_uq_product_image_product_id ON product_image(product_id);
            `,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE product_variant;`);
        await queryRunner.query(`DROP TABLE product_variant_option;`);
    }
}
