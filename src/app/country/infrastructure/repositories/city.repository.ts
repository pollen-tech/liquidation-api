import { CustomRepository } from '../../../../database/decorators/custom-repository.decorator';
import { CityEntity } from './city.entity';
import BaseRepository from '../../../../database/infrastructure/repository/base.repository';

@CustomRepository(CityEntity)
export class CityRepository extends BaseRepository<CityEntity> {}
