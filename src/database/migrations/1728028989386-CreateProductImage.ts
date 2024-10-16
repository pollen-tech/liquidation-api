import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductImage1728028989386 implements MigrationInterface {
    name = 'CreateProductImage1728028989386';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                CREATE TABLE product_image
                (
                    id         uuid                 DEFAULT uuid_generate_v4() primary key,
                    product_id uuid        not null,
                    image      varchar(100),
                    created_at timestamp without time zone NOT NULL DEFAULT now(),
                    updated_at timestamp without time zone NOT NULL DEFAULT now(),
                    updated_on bigint,
                    status     varchar(25) not null DEFAULT 'NA',
                    CONSTRAINT fk_product_image_product_id FOREIGN KEY (product_id) REFERENCES product (id)
                );
                CREATE INDEX IF NOT EXISTS idx_product_image_updated_on ON product_image(updated_on);
                CREATE INDEX IF NOT EXISTS idx_product_image_product_id ON product_image(product_id);
            `,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE product_image;`);
    }
}
