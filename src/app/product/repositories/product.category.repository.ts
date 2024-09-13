import { CustomRepository } from 'src/database/decorators/custom-repository.decorator';
import BaseRepository from 'src/database/infrastructure/repository/base.repository';
import { ProductCategoryEntity } from './product.category.entity';

@CustomRepository(ProductCategoryEntity)
export class ProductCategoryRepository extends BaseRepository<ProductCategoryEntity> { }