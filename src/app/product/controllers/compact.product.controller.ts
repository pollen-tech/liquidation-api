import {Controller, Get, HttpStatus, Query} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {Public} from 'nest-keycloak-connect';
import {ProductApiResDto, ProductPaginationParam, ProductResPage} from '../dto/product.dto';
import {CompactProductService} from "../domain/compact.product.service";

@ApiTags('Products in Compact size')
@Controller('products/compact')
@Public()
export class CompactProductController {

    constructor(private readonly compactProductService: CompactProductService) {
    }

    @Get()
    async findAllByPageAndActiveStatus(@Query() paginationParam: ProductPaginationParam) {
        const paginatedProducts = await this.compactProductService.findAllByPageAndActiveStatus(paginationParam);
        return this.createApiRes(paginatedProducts, 'OK', HttpStatus.OK);
    }

    async createApiRes(data: ProductResPage,
                       status: string, status_code: number) {
        const res: ProductApiResDto = {
            status_code: status_code,
            status: status,
            data: data,
        };
        return res;
    }
}
