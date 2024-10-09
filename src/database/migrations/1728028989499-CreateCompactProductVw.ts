import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateCompactProductVw1728028989499 implements MigrationInterface {

    name = 'CreateCompactProductVw1728028989499';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                DROP view IF EXISTS compact_product_vw;

                CREATE OR REPLACE view compact_product_vw
                AS
                  SELECT p.id  ,
                         p.name ,
                         p.seq_no,
                         p.pollen_sku,
                         p.sku,
                         p.brand_id,
                         b.name     AS brand_name,
                         p.lms_company_id,
                         p.status,
                         (SELECT image
                          FROM   product_image pi
                          WHERE  pi.product_id = p.id
                          and pi.status = 'ACTIVE' 
                          LIMIT  1) AS image
                  FROM   product p
                         INNER JOIN brand b
                                 ON p.brand_id = b.id; 
            `,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP view IF EXISTS compact_product_vw;`);
    }

}
