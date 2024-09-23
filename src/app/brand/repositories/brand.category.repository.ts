import { BrandCategoryEntity } from './brand.category.entity';
import { CustomRepository } from '../../../database/decorators/custom-repository.decorator';
import BaseRepository from '../../../database/infrastructure/repository/base.repository';

@CustomRepository(BrandCategoryEntity)
export class BrandCategoryRepository extends BaseRepository<BrandCategoryEntity> {}
