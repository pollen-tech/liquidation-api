import { configure as serverlessExpress } from '@codegenie/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';

let cachedServer;

export const handler = async (event, context) => {
    if (!cachedServer) {
        initializeTransactionalContext();

        const nestApp = await NestFactory.create(AppModule, { cors: true });

        nestApp.enableCors({
            origin: '*',
            allowedHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key', 'X-Amz-Security-Token', 'X-Amz-User-Agent', 'user-id'],
            credentials: true,
            preflightContinue: true,
        });

        await nestApp.init();
        cachedServer = serverlessExpress({ app: nestApp.getHttpAdapter().getInstance() });
    }
    return cachedServer(event, context);
};
