import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';
import { BrandService } from '../domain/brand.service';
import { BrandApiResDto, BrandDtoRes, NewBrandDto, UpdateMultipleBrandDto, BrandPaginationParam } from '../dto/brand.dto';
import { PaginationParam } from '../../../common/pagination.entity';
import { BrandCompactService } from '../domain/BrandCompactService';

@ApiTags('Brands')
@Controller('brands')
@Public()
export class BrandController {
    constructor(
        private readonly brandService: BrandService,
        private readonly brandCompactService: BrandCompactService,
    ) {}

    @Get('validate-name')
    async validateBrandName(@Query('name') name: string) {
        return this.createApiRes(await this.brandService.isBrandNameTaken(name), 'OK', HttpStatus.OK);
    }

    @Post()
    async createBrand(@Body() reqDto: NewBrandDto) {
        return this.createApiRes(await this.brandService.createBrand(reqDto), 'CREATED', HttpStatus.CREATED);
    }

    @Get()
    async findAllActiveBrands(@Query() paginationParam: BrandPaginationParam) {
        const paginatedBrands = await this.brandService.findAllBrandsWithCategories(paginationParam);
        return this.createApiRes(paginatedBrands, 'OK', HttpStatus.OK);
    }

    @Get('/compact')
    async findAllActiveBrandsAsCompact(@Query() paginationParam: BrandPaginationParam) {
        const data = await this.brandCompactService.findAllActive(paginationParam);
        return this.createApiRes(data, 'OK', HttpStatus.OK);
    }

    @Get('search/by-name')
    async findAllBrandsByName(@Query('name') name: string) {
        return this.createApiRes(await this.brandService.findAllBrandsByName(name), 'OK', HttpStatus.OK);
    }

    @Get('/id_and_name_only')
    async findAllActiveWithIdAndNameOnly() {
        return this.createApiRes(await this.brandService.findAllBrandsWithIdAndNameOnly(), 'OK', HttpStatus.OK);
    }

    @Get(':id')
    async findBrandById(@Param('id') id: string) {
        return this.createApiRes(await this.brandService.findByBrandId(id), 'OK', HttpStatus.OK);
    }

    @Get(':id/brand_category')
    async findBrandCategoryByBrandId(@Param('id') id: string) {
        return this.createApiRes(await this.brandService.findBrandCategorywithBrandId(id), 'OK', HttpStatus.OK);
    }

    @Put('multiple')
    async updateMultipleBrands(@Body() multiBrandDto: UpdateMultipleBrandDto) {
        return this.createApiRes(await this.brandService.updateMultipleBrands(multiBrandDto.brands), 'UPDATED', HttpStatus.OK);
    }

    @Delete(':id')
    softDeleteBrand(@Param('id') id: string) {
        return this.createApiRes(this.brandService.softDeleteBrand(id), 'DELETED', HttpStatus.OK);
    }

    createApiRes(data: BrandDtoRes | BrandDtoRes[] | any, status: string, status_code: number) {
        const api_res: BrandApiResDto = {
            status_code: status_code,
            status: status,
            message: 'Data found.',
            data: data,
        };
        return api_res;
    }
}
