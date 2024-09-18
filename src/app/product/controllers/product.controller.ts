import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';
import { NewProductDto, ProductApiResDto, ProductResDto } from '../dto/product.dto';
import { ProductService } from '../domain/product.service';
import { ProductEntity } from '../repositories/product.entity';
import { ProductCategoryEntity } from '../repositories/product.category.entity';

@ApiTags('Product')
@Controller('product')
@Public()
export class ProductController {
	constructor(private readonly productService: ProductService) { }

	@Post()
	async createProduct(@Body() reqDto: NewProductDto) {
		return this.createApiRes(await this.productService.createProduct(reqDto), 'CREATED');
	}

	@Get()
	async findAllProducts() {
		return this.createApiRes(await this.productService.findAllProductsWithCategories(), 'OK');
	}

	@Get('search/by-name')
	async findAllProductsByName(@Query('name') name: string) {
		return this.createApiRes(await this.productService.findAllProductsByName(name), 'OK');
	}

	@Get(':id')
	async findProductwithProductId(@Param('id') id: string) {
		return this.createApiRes(await this.productService.findProductwithProductId(id), 'OK');
	}

	@Get(':id/product_category')
	async findProductCategorywithBrandId(@Param('id') id: string) {
		return this.createApiRes(await this.productService.findProductCategorywithProductId(id), 'OK');
	}

	@Put(':id')
	async updateProduct(@Param('id') id: string, @Body() reqDto: NewProductDto) {
		return this.createApiRes(await this.productService.updateProduct(id, reqDto), 'UPDATED');
	}

	@Delete(':id')
	softDeleteProduct(@Param('id') id: string) {
		//return this.productService.softDeleteProduct(id);
		return this.createApiRes(this.productService.softDeleteProduct(id), 'DELETED');
	}

	async createApiRes(data: ProductResDto | ProductResDto[] | ProductApiResDto | ProductApiResDto[] | any, status_code: string) {
		const res: ProductApiResDto = {
			status_code: status_code,
			message: 'Data found.',
			data: data,
		};
		return res;
	}
}
