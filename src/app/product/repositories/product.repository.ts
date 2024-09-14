
import { ProductEntity } from './product.entity';
import {CustomRepository} from "../../../database/decorators/custom-repository.decorator";
import BaseRepository from "../../../database/infrastructure/repository/base.repository";

@CustomRepository(ProductEntity)
export class ProductRepository extends BaseRepository<ProductEntity> {}
