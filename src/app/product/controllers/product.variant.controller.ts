import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {Public} from 'nest-keycloak-connect';
import {ProductVariantOptionService} from '../domain/product.variant.option.service';
import {
    DeleteMultiProductVariantDto,
    DeleteProductVariantStatusDto,
    NewMultiProductVariantDto,
    NewProductVariantDto,
    NewProductVariantOptionDto,
    ProductVariantApiResDto,
    ProductVariantDto,
} from '../dto/product.variant.dto';
import {ProductVariantService} from '../domain/product.variant.service';

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
    async getProductVariantOptions(@Param('product_id') productId: string) {
        return this.createApiRes(await this.productVariantOptionService.findByProductId(productId), 'OK', HttpStatus.OK);
    }

    @Post('/:product_id/options')
    async createProductVariantOptions(@Param('product_id') productId: string, @Body() reqDto: NewProductVariantOptionDto) {
        reqDto.product_id = productId;
        return this.createApiRes(await this.productVariantOptionService.createOrUpdate(reqDto), 'CREATED', HttpStatus.CREATED);
    }

    @Put('/:product_id/options')
    async updateProductVariantOptions(@Param('product_id') productId: string,
                                      @Body() reqDto: NewProductVariantOptionDto) {
        reqDto.product_id = productId;
        return this.createApiRes(await this.productVariantOptionService.createOrUpdate(reqDto), 'OK', HttpStatus.OK);
    }

    @ApiOperation({
        summary: 'Create or Update 1 or many product variants',
        description: 'In Variant json, "id" is required for Update Variant only',
    })
    @Post('/multiple')
    async createMultipleProductVariant(@Body() reqDto: NewMultiProductVariantDto) {
        return this.createApiRes(await this.productVariantService.multiCreateOrUpdate(reqDto), 'CREATED', HttpStatus.CREATED);
    }

    @ApiOperation({
        summary: 'Create or Update  a product variant',
        description: 'In Variant json, "id" is required for Update Variant only',
    })
    @Post()
    async createProductVariant(@Body() reqDto: NewProductVariantDto) {
        return this.createApiRes(await this.productVariantService.createOrUpdate(reqDto), 'CREATED', HttpStatus.CREATED);
    }

    @Get()
    async getProductVariant(@Query('product_id') productId: string) {
        return this.createApiRes(await this.productVariantService.findAllByProductId(productId), 'OK', HttpStatus.OK);
    }

    @Delete()
    async deleteProductVariant(@Body() deleteReqDto: DeleteMultiProductVariantDto) {
        return this.createApiRes(await this.productVariantService.multiDelete(deleteReqDto), 'OK', HttpStatus.OK);
    }

    private async createApiRes(
        data: DeleteProductVariantStatusDto[] | ProductVariantDto[] | NewProductVariantOptionDto | ProductVariantDto,
        status: string,
        status_code: number,
    ) {
        if (data && Array.isArray(data) && data[0] instanceof DeleteProductVariantStatusDto) {
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
            message: (data == null ? 'No Data found' : 'Data found'),
            data: data,
        };
        return res;
    }
}
