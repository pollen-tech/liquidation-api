import { Test } from '@nestjs/testing';
import { HealthcheckModule } from '../../../src/app/healthcheck/healthcheck.module';
import { CustomConfigModule } from '../../../src/config/config.module';
import { DatabaseModule } from '../../../src/database/database.module';
import { INestApplication } from '@nestjs/common';
import apiRequestTest from 'supertest';
import { TestDatabaseModule } from '../../config/test.database.module';

describe('Controller: Healthcheck API Test', () => {
    let app: INestApplication;
    let httpServer: any;

    beforeAll(async () => {
        const testingModule = await Test.createTestingModule({
            imports: [CustomConfigModule, TestDatabaseModule.forRoot(), HealthcheckModule],
            controllers: [],
            providers: [],
        }).compile();

        app = testingModule.createNestApplication();
        app.setGlobalPrefix('/api');
        await app.init();
        httpServer = app.getHttpServer();
    });

    it('GET - /healthcheck', async () => {
        let response = await apiRequestTest(httpServer)
            .get('/api/healthcheck')
            .expect(200)
            .expect((res) => {
                expect(res.body.status).toBe('ok');
                expect(res.body.info).toEqual({ database: { status: 'up' } });
            });
        console.log('Response', response.body);
    });
});
