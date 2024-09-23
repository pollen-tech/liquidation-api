import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TestDatabaseModule } from '../../../config/test.database.module';
import { CustomConfigModule } from '../../../../src/config/config.module';
import { BrandModule } from '../../../../src/app/brand/brand.module';
import apiRequestTest from 'supertest';
import { create_brand_req_data } from '../../../data/json/create_brand_data';

describe('Controller: Brand API Test', () => {
    let app: INestApplication;
    let httpServer: any;

    beforeAll(async () => {
        const testingModule = await Test.createTestingModule({
            imports: [CustomConfigModule, TestDatabaseModule.forRoot(), BrandModule],
            controllers: [],
            providers: [],
        }).compile();

        app = testingModule.createNestApplication();
        app.setGlobalPrefix('/api');
        await app.init();
        httpServer = app.getHttpServer();
    });

    it('POST,Crate Brand - /brand', async () => {
        const req_dto = create_brand_req_data;
        let response = await apiRequestTest(httpServer).post('/api/brand').send(req_dto).set('Accept', 'application/json').expect(201);

        console.log('Response : ', JSON.stringify(response.body));
    });
});
