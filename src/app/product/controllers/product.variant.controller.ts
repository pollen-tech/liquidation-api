import {Body, Controller, Get, HttpStatus, Post, Put, Query} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {Public} from 'nest-keycloak-connect';
import {ProductVariantOptionService} from "../domain/product.variant.option.service";
import {NewProductVariantOptionDto, ProductVariantApiResDto} from "../dto/product.variant.dto";

@ApiTags('Products Variant & Options Controller')
@Controller('product-variants')
@Public()
export class ProductVariantController {
    constructor(
        private readonly productVariantOptionService: ProductVariantOptionService,
    ) {
    }

    @Get('/:product_id/options')
    async getProductVariantOptions(@Query('product_id') productId: string,) {
        return this.createApiRes(await this.productVariantOptionService.findByProductId(productId), 'OK', HttpStatus.OK);
    }

    @Post('/:product_id/options')
    async createProductVariantOptions(@Body() reqDto: NewProductVariantOptionDto) {
        return this.createApiRes(await this.productVariantOptionService.createOrUpdate(reqDto), 'OK', HttpStatus.OK);
    }

    @Put('/:product_id/options')
    async updateProductVariantOptions(@Body() reqDto: NewProductVariantOptionDto) {
        return this.createApiRes(await this.productVariantOptionService.createOrUpdate(reqDto), 'OK', HttpStatus.OK);
    }

    async createApiRes(data: NewProductVariantOptionDto, status: string, status_code: number) {
        const res: ProductVariantApiResDto = {
            status_code: status_code,
            status: status,
            message: 'Data found.',
            data: data,
        };
        return res;
    }
}
