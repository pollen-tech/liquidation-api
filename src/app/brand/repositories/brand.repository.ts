import { BrandEntity } from './brand.entity';
import { CustomRepository } from '../../../database/decorators/custom-repository.decorator';
import BaseRepository from '../../../database/infrastructure/repository/base.repository';
import { Not } from 'typeorm';
import { Status } from '../../../common/enums/common.enum';
import { PaginationParam } from 'src/common/pagination.entity';

@CustomRepository(BrandEntity)
export class BrandRepository extends BaseRepository<BrandEntity> {
    async findAllByActiveStatus() {
        return await this.getRepository().findBy({ status: Status.ACTIVE });
    }

    async findAllByActiveStatusOrderByName() {
        return await this.getRepository().find({
            where: { status: Status.ACTIVE },
            order: { name: 'ASC' },
        });
    }

    async getPaginatedBrandsByActiveStatus(paginationParam: PaginationParam) {
        return await this.getPaginated(paginationParam, { where: { status: Status.ACTIVE } });
    }
}
