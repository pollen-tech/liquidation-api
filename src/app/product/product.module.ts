import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './domain/product.service';

import { ProductEntity } from './repositories/product.entity';
import { ProductRepository } from './repositories/product.repository';

import { ProductCategoryEntity } from './repositories/product.category.entity';
import { ProductCategoryRepository } from './repositories/product.category.repository';

import { UserProductEntity } from './repositories/user.product.entity';
import { UserProductRepository } from './repositories/user.product.repository';
import { DatabaseModule } from '../../database/database.module';
import { ProductImageRepository } from './repositories/product.image.repository';
import { ProductImageEntity } from './repositories/product.image.entity';
import { ProductImageService } from './domain/product.image.service';
import { CompactProductController } from './controllers/compact.product.controller';
import { CompactProductService } from './domain/compact.product.service';
import { CompactProductEntity } from './repositories/compact.product.entity';
import { CompactProductRepository } from './repositories/compact.product.repository';

let repositories: any[] = [ProductRepository, ProductCategoryRepository, UserProductRepository, ProductImageRepository, CompactProductRepository];

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductEntity, ProductCategoryEntity, UserProductEntity, ProductImageEntity, CompactProductEntity]),
        DatabaseModule.forCustomRepository(repositories),
    ],
    providers: [ProductService, ProductImageService, CompactProductService],
    controllers: [ProductController, CompactProductController],
    exports: [TypeOrmModule, ProductService],
})
export class ProductModule {}
