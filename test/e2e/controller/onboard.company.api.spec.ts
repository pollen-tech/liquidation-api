import { Test } from '@nestjs/testing';
import { CustomConfigModule } from '../../../src/config/config.module';
import { INestApplication } from '@nestjs/common';
import { TestDatabaseModule } from '../../config/test.database.module';
import { OnboardModule } from '../../../src/app/onboard/onboard.module';

describe('Controller: Onboard Company API Test', () => {
    let app: INestApplication;
    let httpServer: any;

    beforeAll(async () => {
        const testingModule = await Test.createTestingModule({
            imports: [CustomConfigModule, TestDatabaseModule.forRoot(), OnboardModule],
            controllers: [],
            providers: [],
        }).compile();

        app = testingModule.createNestApplication();
        app.setGlobalPrefix('/api');
        await app.init();
        httpServer = app.getHttpServer();
    });

    it('POST - /onboard-company', async () => {});
});
