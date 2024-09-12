import { CustomRepository } from 'src/database/decorators/custom-repository.decorator';
import BaseRepository from 'src/database/infrastructure/repository/base.repository';
import { BrandCategoryEntity } from './brand.category.entity';

@CustomRepository(BrandCategoryEntity)
export class BrandCategoryRepository extends BaseRepository<BrandCategoryEntity> { }