import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CountryService } from 'src/app/country/domain/country.service';
import { CountryResDto } from '../dto/country.dto';
import { Public } from 'nest-keycloak-connect';

@ApiTags('Country')
@Controller('country')
@Public()
export class CountryController {
    constructor(private readonly countryService: CountryService) {}

    @Get()
    async getAllCountries() {
        let data = await this.countryService.getActiveCountries();
        return this.createResDtoWhenSuccess(data);
    }

    @Get('/:country_id/city')
    async getCity(@Param('country_id') country_id: number) {
        let data = await this.countryService.getCitiesOfCountry(country_id);
        return this.createResDtoWhenSuccess(data);
    }

    private createResDtoWhenSuccess(data: CountryResDto | any): CountryResDto {
        return {
            status_code: 'OK',
            message: 'Data found.',
            data: data,
        };
    }
}
