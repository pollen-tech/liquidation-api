import {Test} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import {TestDatabaseModule} from '../../../config/test.database.module';
import {CustomConfigModule} from '../../../../src/config/config.module';
import apiRequestTest from 'supertest';
import {ProductModule} from '../../../../src/app/product/product.module';
import {BrandRepository} from '../../../../src/app/brand/repositories/brand.repository';
import {DataRepository} from '../../../config/db/data.repository';
import {BrandEntity} from '../../../../src/app/brand/repositories/brand.entity';
import {BrandModule} from '../../../../src/app/brand/brand.module';
import {create_product_req_data} from '../../../data/json/create_product';
import {ProductService} from "../../../../src/app/product/domain/product.service";
import {addTransactionalDataSource, initializeTransactionalContext} from "typeorm-transactional";
import {UpdateMultiProductDto} from "../../../../src/app/product/dto/product.dto";

describe('Controller: Product API Test', () => {
    let app: INestApplication;
    let httpServer: any;
    let brand_repository: BrandRepository;
    let product_service: ProductService;
    let brand_entity: BrandEntity;

    initializeTransactionalContext();

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
        product_service = testingModule.get<ProductService>(ProductService);

        //* create test data * /
        brand_entity = await DataRepository.createBrand(brand_repository);
    });

    it('POST,Create Product - /product', async () => {
        /* Get the brand id */
        const saved_brand_id = brand_entity.id;

        /* prepare json request data */
        const req_dto = create_product_req_data;
        req_dto.brand_id = saved_brand_id;
        req_dto.name = "Product " + Date.now()

        /* send the request */
        let response = await apiRequestTest(httpServer).post('/api/product').send(req_dto).set('Accept', 'application/json').expect(201);

        console.log('Response : ', JSON.stringify(response.body));
    });


    it('PUT, Edit Product - /product/{id}', async () => {
        /* Get the brand id */
        const saved_brand_id = brand_entity.id;

        /* prepare json request data */
        const req_dto = create_product_req_data;
        req_dto.name = "Product " + Date.now()
        req_dto.brand_id = saved_brand_id;

        /* send the request */
        let saved_product = await product_service.createProduct(req_dto)
        let edit_req_dto = {...req_dto, id: saved_product.id}

        /* send the request */
        edit_req_dto.name = 'Updated Product ' + Date.now();
        let response = await apiRequestTest(httpServer).put('/api/product/' + saved_product.id)
            .send(edit_req_dto).set('Accept', 'application/json').expect(200);

        console.log('Response : ', JSON.stringify(response));
    });


    it('PUT, Update Multiple Product - /product', async () => {
        /* Get the brand id */
        const saved_brand_id = brand_entity.id;

        /* prepare json request data */
        const reqDto = create_product_req_data;
        reqDto.name = "Product " + Date.now()
        reqDto.brand_id = saved_brand_id;

        /* send the request */
        let savedProduct = await product_service.createProduct(reqDto)

        let editReqDtoList = [];
        editReqDtoList.push({
            ...reqDto,
            id: savedProduct.id,
            name: 'Updated Product ' + Date.now()
        });

        // create update request
        let req: UpdateMultiProductDto = {
            products: editReqDtoList
        };

        /* send the request */
        let response = await apiRequestTest(httpServer).put('/api/product/multiple')
            .send(req).set('Accept', 'application/json').expect(200);

        console.log('Response : ', JSON.stringify(response.body));
    });

});
