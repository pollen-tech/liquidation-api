import { CustomRepository } from 'src/database/decorators/custom-repository.decorator';
import BaseRepository from 'src/database/infrastructure/repository/base.repository';
import { UserProductEntity } from './user.product.entity';

@CustomRepository(UserProductEntity)
export class UserProductRepository extends BaseRepository<UserProductEntity> {}
