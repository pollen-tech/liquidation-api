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
import { ProductVariantController } from './controllers/product.variant.controller';
import { ProductVariantService } from './domain/product.variant.service';
import { ProductVariantOptionService } from './domain/product.variant.option.service';
import { ProductVariantRepository } from './repositories/product.variant.repository';
import { ProductVariantOptionRepository } from './repositories/product.variant.option.repository';
import { ProductVariantOptionEntity } from './entity/product.variant.option.entity';
import { ProductVariantEntity } from './entity/product.variant.entity';

let repositories: any[] = [
    ProductRepository,
    ProductCategoryRepository,
    UserProductRepository,
    ProductImageRepository,
    CompactProductRepository,
    ProductVariantRepository,
    ProductVariantOptionRepository,
];

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductEntity,
            ProductCategoryEntity,
            UserProductEntity,
            ProductImageEntity,
            CompactProductEntity,
            ProductVariantOptionEntity,
            ProductVariantEntity,
        ]),
        DatabaseModule.forCustomRepository(repositories),
    ],
    providers: [ProductService, ProductImageService, CompactProductService, ProductVariantService, ProductVariantOptionService],
    controllers: [ProductController, CompactProductController, ProductVariantController],
    exports: [TypeOrmModule, ProductService],
})
export class ProductModule {}
