import { CustomRepository } from 'src/database/decorators/custom-repository.decorator';
import BaseRepository from 'src/database/infrastructure/repository/base.repository';
import { ProductEntity } from './product.entity';

@CustomRepository(ProductEntity)
export class ProductRepository extends BaseRepository<ProductEntity> {}
