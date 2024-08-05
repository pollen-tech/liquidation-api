import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { Country_DeprecatedController } from './application/controllers/country.controller';
import { CountryController } from './controllers/country.controller';
import { CountryService } from './domain/country.service';
import { CountryEntity } from './infrastructure/repositories/country.entity';
import { CountryRepository } from './infrastructure/repositories/country.repository';
import { CityEntity } from './infrastructure/repositories/city.entity';
import { CityRepository } from './infrastructure/repositories/city.repository';

@Module({
    imports: [TypeOrmModule.forFeature([CountryEntity, CityEntity]), DatabaseModule.forCustomRepository([CountryRepository, CityRepository])],
    providers: [CountryService],
    controllers: [Country_DeprecatedController, CountryController],
    exports: [TypeOrmModule, CountryService],
})
export class CountryModule {}
