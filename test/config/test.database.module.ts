import {DynamicModule, Logger} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DatabaseHealthcheckService} from '../../src/database/database-healthcheck.service';
import {CustomConfigModule} from '../../src/config/config.module';
import {TerminusModule} from '@nestjs/terminus';
import {BrandEntity} from '../../src/app/brand/repositories/brand.entity';
import {BrandCategoryEntity} from '../../src/app/brand/repositories/brand.category.entity';
import {ProductCategoryEntity} from '../../src/app/product/repositories/product.category.entity';
import {ProductEntity} from '../../src/app/product/repositories/product.entity';
import {UserProductEntity} from "../../src/app/product/repositories/user.product.entity";
import {ProductImageEntity} from "../../src/app/product/repositories/product.image.entity";

const DB_HOST: string = 'localhost';
const DB_PORT: number = 5460;
const DB_NAME = 'liquid_db';
const DB_USERNAME = 'devuser';
const DB_PASSWORD = 'password334';

const entitiesList = [BrandEntity, BrandCategoryEntity, ProductCategoryEntity, ProductEntity,
UserProductEntity, ProductImageEntity];


process.env.NODE_ENV = 'test'

/**
 * Handle Database connection.
 */
export class TestDatabaseModule {
    static migrationConfig() {
        return {
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USERNAME,
            password: DB_PASSWORD,
            db: DB_NAME,
        };
    }

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
            synchronize: false, // for DEV/TEST only
            dropSchema: false, // NOTE - Only for TEST (it drops schema for testing and creates again)
            keepConnectionAlive: true,
            logging: true, // true when want print sql
        });
    }
}
