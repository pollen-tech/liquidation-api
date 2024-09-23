import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TestDatabaseModule } from '../../../config/test.database.module';
import { CustomConfigModule } from '../../../../src/config/config.module';
import apiRequestTest from 'supertest';
import { ProductModule } from '../../../../src/app/product/product.module';
import { BrandRepository } from '../../../../src/app/brand/repositories/brand.repository';
import { DataRepository } from '../../../config/db/data.repository';
import { BrandEntity } from '../../../../src/app/brand/repositories/brand.entity';
import { BrandModule } from '../../../../src/app/brand/brand.module';
import { create_product_req_data } from '../../../data/json/create_product';

describe('Controller: Product API Test', () => {
    let app: INestApplication;
    let httpServer: any;
    let brand_repository: BrandRepository;
    let brand_entity: BrandEntity;

    beforeAll(async () => {
        const testingModule = await Test.createTestingModule({
            imports: [CustomConfigModule, TestDatabaseModule.forRoot(), BrandModule, ProductModule],
            controllers: [],
            providers: [],
        }).compile();

        app = testingModule.createNestApplication();
        app.setGlobalPrefix('/api');
        await app.init();
        httpServer = app.getHttpServer();

        brand_repository = testingModule.get<BrandRepository>(BrandRepository);

        //* create test data * /
        brand_entity = await DataRepository.createBrand(brand_repository);
    });

    it('POST,Create Product - /product', async () => {
        /* Get the brand id */
        const saved_brand_id = brand_entity.id;

        /* prepare json request data */
        const req_dto = create_product_req_data;
        req_dto.brand_id = saved_brand_id;

        /* send the request */
        let response = await apiRequestTest(httpServer).post('/api/product').send(req_dto).set('Accept', 'application/json').expect(201);

        console.log('Response : ', JSON.stringify(response.body));
    });
});
