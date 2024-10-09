import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {Public} from 'nest-keycloak-connect';
import {
    NewProductDto,
    ProductApiResDto,
    ProductPaginationParam,
    ProductResDto,
    UpdateMultiProductDto,
    UpdateProductDto
} from '../dto/product.dto';
import {ProductService} from '../domain/product.service';
import {ProductImageService} from "../domain/product.image.service";

@ApiTags('Products')
@Controller('products')
@Public()
export class ProductController {

    constructor(private readonly productService: ProductService,
                private readonly productImageService: ProductImageService
    ) {
    }

    @Get('validate-name')
    async validateProductName(
        @Query('company_id') companyId: string,
        @Query('name') name: string) {
        return this.createApiRes(await this.productService.isProductNameTaken(name), 'OK', HttpStatus.OK);
    }

    @Post()
    async createProduct(@Body() reqDto: NewProductDto) {
        return this.createApiRes(await this.productService.createProduct(reqDto), 'CREATED', HttpStatus.CREATED);
    }

    @Put("/multiple")
    async updateMultipleProducts(@Body() multiProducts: UpdateMultiProductDto) {
        return this.createApiRes(await this.productService.updateMultipleProducts(multiProducts.products), 'UPDATED', HttpStatus.OK);
    }

    @Get()
    async findAllProducts(
        @Query() paginationParam: ProductPaginationParam) {
        const paginatedProducts = await this.productService.findAllProductsWithCategories(paginationParam);
        return this.createApiRes(paginatedProducts, 'OK', HttpStatus.OK);
    }

    @Get('search/by-name')
    async findAllProductsByName(@Query('name') name: string) {
        return this.createApiRes(await this.productService.findAllProductsByName(name), 'OK', HttpStatus.OK);
    }

    @Get(':id')
    async findProductByProductId(@Param('id') id: string) {
        return this.createApiRes(await this.productService.findProductByProductId(id), 'OK', HttpStatus.OK);
    }

    @Get(':id/product_category')
    async findProductCategoryById(@Param('id') id: string) {
        return this.createApiRes(await this.productService.findProductCategoryByProductId(id), 'OK', HttpStatus.OK);
    }

    @Put(':id')
    async updateProductById(@Param('id') id: string, @Body() reqDto: UpdateProductDto) {
        reqDto.id = id;
        return this.createApiRes(await this.productService.updateProduct(reqDto), 'UPDATED', HttpStatus.OK);
    }

    @Get(':id/image')
    async getProductImage(@Param('id') id: string,
                          @Query('product_name') productName: string) {
        return this.createApiRes(await this.productImageService.findByProductId(id, productName), 'OK', HttpStatus.OK);
    }

    @Delete(':id')
    softDeleteProduct(@Param('id') id: string) {
        return this.createApiRes(this.productService.softDeleteProduct(id), 'DELETED', HttpStatus.OK);
    }

    async createApiRes(data: ProductResDto | ProductResDto[] | ProductApiResDto | ProductApiResDto[] | any,
                       status: string, status_code: number) {
        const res: ProductApiResDto = {
            status_code: status_code,
            status: status,
            message: 'Data found.',
            data: data,
        };
        return res;
    }
}
