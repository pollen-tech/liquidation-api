import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductsTables1726134673075 implements MigrationInterface {
	name = 'CreateProductsTables1726134673075'

	public async up(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.query(
			`
                CREATE TABLE product
                (
                    id             uuid         DEFAULT uuid_generate_v4() primary key,
                    sku_no         integer      default 1,
                    pollen_sku_no  varchar(25)  NOT NULL,
										brand_id       uuid         NOT NULL,
                    image          varchar(100), 
										lms_company_id integer      default 1,
                    CONSTRAINT fk_product_brand_id FOREIGN KEY (brand_id) REFERENCES brand(id)
                );
            `,
		);

		await queryRunner.query(
			`
                CREATE TABLE product_category
                (
										id                uuid               DEFAULT uuid_generate_v4() primary key,
                    product_id        uuid               NOT NULL,
										category_id       smallint           default 0,
                    category_name     varchar(100)       default 'NA',
										sub_category_id   smallint           default 0,
                    sub_category_name varchar(100)       default 'NA',
                    CONSTRAINT fk_product_category_product_id FOREIGN KEY (product_id) REFERENCES product(id)
                );
                CREATE INDEX IF NOT EXISTS idx_product_category_product_id ON product_category(product_id)
            `,
		);

		await queryRunner.query(
			`
                CREATE TABLE product_psi
                (
										id                uuid               DEFAULT uuid_generate_v4() primary key,
                    product_id        uuid               NOT NULL,
										score             smallint           default 0,
                    CONSTRAINT fk_product_psi_product_id FOREIGN KEY (product_id) REFERENCES product(id)
                );
                CREATE INDEX IF NOT EXISTS idx_product_psi_product_id ON product_psi(product_id)
            `,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE product;`);
		await queryRunner.query(`DROP TABLE product_category;`);
		await queryRunner.query(`DROP TABLE product_psi;`);
	}

}