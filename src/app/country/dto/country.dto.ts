import { IsNotEmpty } from 'class-validator';
import { CountryEntity } from '../infrastructure/repositories/country.entity';
import { Status } from '../../../common/enums/common.enum';
import { CityEntity } from '../infrastructure/repositories/city.entity';

export class CountryResDto {
    status_code: string;
    message!: string;
    data: any | CountryDto | CountryDto[];
}

export class CountryDto {
    @IsNotEmpty()
    country_id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    iso3: string;

    @IsNotEmpty()
    phone_code: string;

    @IsNotEmpty()
    status: Status;
}

export class CityDto {
    @IsNotEmpty()
    city_id: number;

    @IsNotEmpty()
    country_id: number;

    @IsNotEmpty()
    name: string;
}

export class CountryMapper {
    static toDto(entity: CountryEntity): CountryDto {
        return {
            country_id: entity.id,
            name: entity.name,
            iso3: entity.iso3,
            phone_code: entity.phone_code,
            status: entity.status,
        };
    }

    static toDtos(entities: CountryEntity[]): CountryDto[] {
        let dtos = [];
        entities.forEach((entity) => {
            dtos.push(this.toDto(entity));
        });
        return dtos;
    }
}

export class CityMapper {
    static toDto(entity: CityEntity): CityDto {
        return {
            city_id: entity.id,
            name: entity.name,
            country_id: entity.country_id,
        };
    }

    static toDtos(entities: CityEntity[]): CityDto[] {
        let dtos = [];
        entities.forEach((entity) => {
            dtos.push(this.toDto(entity));
        });
        return dtos;
    }
}
