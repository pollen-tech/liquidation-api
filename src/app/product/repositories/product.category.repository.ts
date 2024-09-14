
import { ProductCategoryEntity } from './product.category.entity';
import BaseRepository from "../../../database/infrastructure/repository/base.repository";
import {CustomRepository} from "../../../database/decorators/custom-repository.decorator";

@CustomRepository(ProductCategoryEntity)
export class ProductCategoryRepository extends BaseRepository<ProductCategoryEntity> {}
