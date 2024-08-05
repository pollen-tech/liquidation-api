import { Injectable } from '@nestjs/common';
import { CountryRepository } from '../infrastructure/repositories/country.repository';
import { Status } from '../../../common/enums/common.enum';
import { CityRepository } from '../infrastructure/repositories/city.repository';
import { CityMapper, CountryMapper } from '../dto/country.dto';

@Injectable()
export class CountryService {
    constructor(
        private readonly countryRepository: CountryRepository,
        private cityRepository: CityRepository,
    ) {}

    async getActiveCountries() {
        return await this.countryRepository.find({ where: { status: Status.ACTIVE } }).then((countries) => CountryMapper.toDtos(countries));
    }

    async getCitiesOfCountry(country_id: number) {
        let data = await this.cityRepository.findBy({ country_id: country_id }).then((cities) => CityMapper.toDtos(cities));
        return data;
    }
}
