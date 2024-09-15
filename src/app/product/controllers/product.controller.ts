import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';
import { NewProductDto, ProductApiResDto } from '../dto/product.dto';
import { ProductService } from '../domain/product.service';
import { ProductEntity } from '../repositories/product.entity';
import { ProductCategoryEntity } from '../repositories/product.category.entity';

@ApiTags('Product')
@Controller('product')
@Public()
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    createProduct(@Body() reqDto: NewProductDto) {
        return this.productService.createProduct(reqDto);
    }

    @Get()
    findAllProducts(): Promise<ProductEntity[]> {
        return this.productService.findAllProducts();
    }

    @Get(':id')
    findProductwithProductId(@Param('id') id: string): Promise<ProductEntity> {
        return this.productService.findProductwithProductId(id);
    }

    @Get(':id/product_category')
    async findProductCategorywithBrandId(@Param('id') id: string): Promise<ProductApiResDto> {
        const data = await this.productService.findProductCategorywithProductId(id);
        return {
            status_code: 'OK',
            message: 'Data found.',
            data: data,
        };
    }

    @Put(':id')
    updateProduct(@Param('id') id: string, @Body() reqDto: NewProductDto): Promise<ProductEntity> {
        return this.productService.updateProduct(id, reqDto);
    }

    @Delete(':id')
    softDeleteProduct(@Param('id') id: string): Promise<void> {
        return this.productService.softDeleteProduct(id);
    }

    createApiRes(data: NewProductDto) {
        const res: ProductApiResDto = {
            status_code: 'OK',
            message: 'Data found.',
            data: data,
        };
        return res;
    }
}
