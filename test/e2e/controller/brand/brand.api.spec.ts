import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TestDatabaseModule } from '../../../config/test.database.module';
import { CustomConfigModule } from '../../../../src/config/config.module';
import { BrandModule } from '../../../../src/app/brand/brand.module';
import apiRequestTest from 'supertest';

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
        const req_dto = {
            name: 'Loreal',
            image: 'image.jpeg',
            brand_categories: [
                {
                    category_id: '1',
                    category_name: 'cate01',
                    sub_categories: [
                        {
                            sub_category_id: '1',
                            sub_category_name: 'sub_cate01',
                        },
                        {
                            sub_category_id: '2',
                            sub_category_name: 'sub_cate02',
                        },
                    ],
                },
                {
                    category_id: '2',
                    category_name: 'cate02',
                    sub_categories: [
                        {
                            sub_category_id: '2',
                            sub_category_name: 'sub_cate02',
                        },
                        {
                            sub_category_id: '3',
                            sub_category_name: 'sub_cate03',
                        },
                    ],
                },
            ],
        };

        let response = await apiRequestTest(httpServer).post('/api/brand').send(req_dto).set('Accept', 'application/json').expect(201);

        console.log('Response : ', JSON.stringify(response.body));
    });
});
