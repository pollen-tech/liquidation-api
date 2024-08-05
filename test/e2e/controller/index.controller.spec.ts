import { Test, TestingModule } from '@nestjs/testing';
import { IndexController } from '../../../src/app/index/index.controller';
import { IndexModule } from '../../../src/app/index/index.module';

describe('Healthcheck Test', () => {
    let testingModule: TestingModule;

    let indexController;

    beforeAll(async () => {
        testingModule = await Test.createTestingModule({
            // imports: [CustomConfigModule, DatabaseModule.forRoot(), HealthcheckModule],
            imports: [IndexModule],
            controllers: [],
            providers: [],
        }).compile();
        indexController = testingModule.get<IndexController>(IndexController);
    });

    describe('getHello', () => {
        it('should return Default"', () => {
            const response = indexController.hello();
            console.log('response', response);
        });
    });
});
