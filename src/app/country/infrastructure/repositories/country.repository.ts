import { CustomRepository } from 'src/database/decorators/custom-repository.decorator';
import BaseRepository from 'src/database/infrastructure/repository/base.repository';
import { CountryEntity } from './country.entity';

@CustomRepository(CountryEntity)
export class CountryRepository extends BaseRepository<CountryEntity> {}
