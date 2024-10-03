import {Body, Controller, Delete, Get, HttpStatus, Logger, Param, Post, Put, Query} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {Public} from 'nest-keycloak-connect';
import {NewProductDto, ProductApiResDto, ProductResDto, UpdateProductDto} from '../dto/product.dto';
import {ProductService} from '../domain/product.service';
import {PaginationParam} from "../../../common/pagination.entity";

@ApiTags('Product')
@Controller('product')
@Public()
export class ProductController {

    private logger: Logger;

    constructor(loggerName: string, private readonly productService: ProductService) {
        this.logger = new Logger(loggerName);
    }

    @Get('validate-name')
    async validateProductName(@Query('name') name: string) {
        return this.createApiRes(await this.productService.isProductNameTaken(name), 'OK', HttpStatus.OK);
    }

    @Post()
    async createProduct(@Body() reqDto: NewProductDto) {
        return this.createApiRes(await this.productService.createProduct(reqDto), 'CREATED', HttpStatus.CREATED);
    }

    // @Put()
    // async updateMultipleProduct(  @Body() reqDto: NewProductDto) {
    //     return this.createApiRes(await this.productService.createProduct(reqDto), 'CREATED', HttpStatus.CREATED);
    // }

    @Get()
    async findAllProducts(@Query() paginationParam: PaginationParam) {
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
        return this.createApiRes(await this.productService.updateProduct(id, reqDto), 'UPDATED', HttpStatus.OK);
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
