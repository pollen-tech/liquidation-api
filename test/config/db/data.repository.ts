import { BrandRepository } from '../../../src/app/brand/repositories/brand.repository';
import { BrandEntity } from '../../../src/app/brand/repositories/brand.entity';
import { Status } from '../../../src/common/enums/common.enum';

export class DataRepository {
    static async createBrand(repo: BrandRepository) {
        const entity = new BrandEntity();
        entity.name = 'Dior';
        entity.image = 'dior.jpeg';
        return await repo.save(entity);
    }
}
