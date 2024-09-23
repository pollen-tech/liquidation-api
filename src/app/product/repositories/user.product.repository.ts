import { UserProductEntity } from './user.product.entity';
import { CustomRepository } from '../../../database/decorators/custom-repository.decorator';
import BaseRepository from '../../../database/infrastructure/repository/base.repository';

@CustomRepository(UserProductEntity)
export class UserProductRepository extends BaseRepository<UserProductEntity> {}
