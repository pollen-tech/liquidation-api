import {Body, Controller, Delete, Get, HttpStatus, Post, Put, Query} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {Public} from 'nest-keycloak-connect';
import {ProductVariantOptionService} from "../domain/product.variant.option.service";
import {
    DeleteMultiProductVariantDto,
    DeleteProductVariantStatusDto,
    NewMultiProductVariantDto,
    NewProductVariantOptionDto,
    ProductVariantApiResDto,
    ProductVariantDto
} from "../dto/product.variant.dto";
import {ProductVariantService} from "../domain/product.variant.service";

@ApiTags('Products Variant & Options Controller')
@Controller('product-variants')
@Public()
export class ProductVariantController {
    constructor(
        private readonly productVariantOptionService: ProductVariantOptionService,
        private readonly productVariantService: ProductVariantService,
    ) {
    }

    @Get('/:product_id/options')
    async getProductVariantOptions(@Query('product_id') productId: string,) {
        return this.createApiRes(await this.productVariantOptionService.findByProductId(productId), 'OK', HttpStatus.OK);
    }

    @Post('/:product_id/options')
    async createProductVariantOptions(@Body() reqDto: NewProductVariantOptionDto) {
        return this.createApiRes(await this.productVariantOptionService.createOrUpdate(reqDto), 'OK', HttpStatus.CREATED);
    }

    @Put('/:product_id/options')
    async updateProductVariantOptions(@Body() reqDto: NewProductVariantOptionDto) {
        return this.createApiRes(await this.productVariantOptionService.createOrUpdate(reqDto), 'OK', HttpStatus.OK);
    }

    @Post("/multiple")
    async createProductVariant(@Body() reqDto: NewMultiProductVariantDto) {
        return this.createApiRes(await this.productVariantService.multiCreateOrUpdate(reqDto), 'OK', HttpStatus.CREATED);
    }

    @Get()
    async getProductVariant(@Query('product_id') productId: string) {
        return this.createApiRes(await this.productVariantService.findAllByProductId(productId), 'OK', HttpStatus.OK);
    }

    @Delete()
    async deleteProductVariant(@Body() deleteReqDto: DeleteMultiProductVariantDto) {
        return this.createApiRes(await this.productVariantService.multiDelete(deleteReqDto), 'OK', HttpStatus.OK);
    }

    async createApiRes(data: NewProductVariantOptionDto | ProductVariantDto[] | DeleteProductVariantStatusDto[],
                       status: string, status_code: number) {

        if (data instanceof DeleteProductVariantStatusDto) {
            const res: ProductVariantApiResDto = {
                status_code: status_code,
                status: status,
                message: 'Data Deleted.',
                data: data,
            };
            return res;
        }

        const res: ProductVariantApiResDto = {
            status_code: status_code,
            status: status,
            message: 'Data found.',
            data: data,
        };
        return res;
    }
}
