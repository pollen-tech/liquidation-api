import { DynamicModule, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../src/app/auth-user/repositories/user.entity';
import { DatabaseHealthcheckService } from '../../src/database/database-healthcheck.service';
import { CustomConfigModule } from '../../src/config/config.module';
import { TerminusModule } from '@nestjs/terminus';

const entitiesList = [UserEntity];

/**
 * Handle Database connection.
 */
export class TestDatabaseModule {
    static forRoot(): DynamicModule {
        const providers = [DatabaseHealthcheckService];
        return {
            imports: [CustomConfigModule, TerminusModule, this.forConnection()],
            providers,
            global: true,
            module: TestDatabaseModule,
            exports: providers,
        };
    }

    static forConnection(): DynamicModule {
        const DB_HOST: string = 'localhost';
        const DB_PORT: number = 5450;
        const DB_NAME = 'user_db';
        const DB_USERNAME = 'passdevuser';
        const DB_PASSWORD = 'password334';

        Logger.log('entities : ' + entitiesList.map((item) => item.name));
        Logger.log('When error is EntityMetadataNotFound: No metadata, it means entity name needs to add in entitiesList, TestDBProviderModule');

        return TypeOrmModule.forRoot({
            type: 'postgres',
            host: DB_HOST,
            port: DB_PORT,
            database: DB_NAME,
            username: DB_USERNAME,
            password: DB_PASSWORD,
            entities: entitiesList,
            synchronize: true, // for DEV/TEST only
            dropSchema: true, // NOTE - Only for TEST (it drops schema for testing and creates again)
            keepConnectionAlive: true,
            logging: true, // true when want print sql
        });
    }
}
