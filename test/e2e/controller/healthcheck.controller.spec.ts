import { Test, TestingModule } from '@nestjs/testing';
import { HealthcheckController } from '../../../src/app/healthcheck/application/controllers/healthcheck.controller';
import { HealthcheckModule } from '../../../src/app/healthcheck/healthcheck.module';
import { CustomConfigModule } from '../../../src/config/config.module';
import { DatabaseModule } from '../../../src/database/database.module';

describe('Controller: Healthcheck Test', () => {
    let testingModule: TestingModule;
    let healthCheckController: any;

    beforeAll(async () => {
        testingModule = await Test.createTestingModule({
            // imports: [CustomConfigModule, DatabaseModule.forRoot(), HealthcheckModule],
            imports: [CustomConfigModule, DatabaseModule.forRoot(), HealthcheckModule],
            controllers: [],
            providers: [],
        }).compile();
        healthCheckController = testingModule.get<HealthcheckController>(HealthcheckController);
    });

    describe('fn:check =>', () => {
        it('Should return Pending"', () => {
            const response = healthCheckController.check();
            console.log('response', response);
        });
    });
});
