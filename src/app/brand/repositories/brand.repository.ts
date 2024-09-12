import { CustomRepository } from 'src/database/decorators/custom-repository.decorator';
import BaseRepository from 'src/database/infrastructure/repository/base.repository';
import { BrandEntity } from './brand.entity';

@CustomRepository(BrandEntity)
export class BrandRepository extends BaseRepository<BrandEntity> {
}