import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {Public} from 'nest-keycloak-connect';
import {BrandService} from '../domain/brand.service';
import {BrandApiResDto, BrandDtoRes, NewBrandDto} from '../dto/brand.dto';

@ApiTags('Brand')
@Controller('brand')
@Public()
export class BrandController {
    constructor(private readonly brandService: BrandService) {
    }

    @Get('validate-name')
    async validateBrandName(@Query('name') name: string) {
        return this.createApiRes(await this.brandService.isBrandNameTaken(name), HttpStatus.OK);
    }

    @Post()
    async createBrand(@Body() reqDto: NewBrandDto) {
        return this.createApiRes(await this.brandService.createBrand(reqDto), HttpStatus.CREATED);
    }

    @Get()
    async findAllActiveBrands() {
        return this.createApiRes(await this.brandService.findAllBrandsWithCategories(), HttpStatus.OK);
    }

    @Get('search/by-name')
    async findAllBrandsByName(@Query('name') name: string) {
        return this.createApiRes(await this.brandService.findAllBrandsByName(name), HttpStatus.OK);
    }

    @Get("/id_and_name_only")
    async findAllActiveWithIdAndNameOnly
    () {
        return this.createApiRes(await this.brandService.findAllBrandsWithIdAndNameOnly(), HttpStatus.OK);
    }

    @Get(':id')
    async findBrandById(@Param('id') id: string) {
        return this.createApiRes(await this.brandService.findByBrandId(id), HttpStatus.OK);
    }

    @Get(':id/brand_category')
    async findBrandCategoryByBrandId(@Param('id') id: string) {
        return this.createApiRes(await this.brandService.findBrandCategorywithBrandId(id), HttpStatus.OK);
    }

    @Put(':id')
    async updateBrand(@Param('id') id: string, @Body() updateBrandDto: NewBrandDto) {
        return this.createApiRes(await this.brandService.updateBrand(id, updateBrandDto), HttpStatus.OK);
    }

    @Delete(':id')
    softDeleteBrand(@Param('id') id: string): Promise<void> {
        return this.brandService.softDeleteBrand(id);
    }

    createApiRes(data: BrandDtoRes | BrandDtoRes[] | any, status_code: number) {
        const api_res: BrandApiResDto = {
            status_code: status_code,
            status: "OK",
            data: data,
        };
        return api_res;
    }
}
