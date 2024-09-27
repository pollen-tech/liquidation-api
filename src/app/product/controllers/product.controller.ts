import { Controller, Get, Post, Body, Param, Put, Delete, Query, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';
import { NewProductDto, ProductApiResDto, ProductResDto } from '../dto/product.dto';
import { ProductService } from '../domain/product.service';
import { ProductEntity } from '../repositories/product.entity';
import { ProductCategoryEntity } from '../repositories/product.category.entity';
import { PaginationParam } from 'src/common/pagination.entity';

@ApiTags('Product')
@Controller('product')
@Public()
export class ProductController {
	constructor(private readonly productService: ProductService) { }

	@Get('validate-name')
	async validateProductName(@Query('name') name: string) {
		return this.createApiRes(await this.productService.isProductNameTaken(name), 'OK');
	}

	@Post()
	async createProduct(@Body() reqDto: NewProductDto) {
		return this.createApiRes(await this.productService.createProduct(reqDto), 'CREATED');
	}

	@Get()
	async findAllProducts(@Query() paginationParam: PaginationParam) {
		const paginatedProducts = await this.productService.findAllProductsWithCategories(paginationParam);
		return this.createApiRes(paginatedProducts, 'OK');
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
		return this.createApiRes(await this.productService.findProductCategoryByProductId(id), 'OK');
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
