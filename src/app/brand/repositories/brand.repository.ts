import { BrandEntity } from './brand.entity';
import { CustomRepository } from '../../../database/decorators/custom-repository.decorator';
import BaseRepository from '../../../database/infrastructure/repository/base.repository';
import { Not } from 'typeorm';
import { Status } from '../../../common/enums/common.enum';

@CustomRepository(BrandEntity)
export class BrandRepository extends BaseRepository<BrandEntity> {
    async findAllByActiveStatus() {
        return await this.getRepository().findBy({ status: Status.ACTIVE });
    }
}
