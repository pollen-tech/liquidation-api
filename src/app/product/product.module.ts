import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './domain/product.service';

import { ProductEntity } from './repositories/product.entity';
import { ProductRepository } from './repositories/product.repository';

import { ProductCategoryEntity } from './repositories/product.category.entity';
import { ProductCategoryRepository } from './repositories/product.category.repository';

import { UserProductEntity } from './repositories/user.product.entity';
import { UserProductRepository } from './repositories/user.product.repository';

let repositories: any[] = [ProductRepository, ProductCategoryRepository, UserProductRepository];

@Module({
	imports: [
		TypeOrmModule.forFeature([ProductEntity, ProductCategoryEntity, UserProductEntity]),
		DatabaseModule.forCustomRepository(repositories),
	],
	providers: [ProductService],
	controllers: [ProductController],
	exports: [TypeOrmModule, ProductService],
})
export class ProductModule { }
