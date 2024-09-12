import { CustomRepository } from 'src/database/decorators/custom-repository.decorator';
import BaseRepository from 'src/database/infrastructure/repository/base.repository';
import { BrandEntity } from './brand.entity';

@CustomRepository(BrandEntity)
export class BrandRepository extends BaseRepository<BrandEntity> {
	//async getNextBrandId(): Promise<string> {
	//	console.log('getNextBrandId');
	//	const qb = this.createQueryBuilder(this.metadata.givenTableName);
	//	const data = await qb.select('coalesce(max(brand_id)+1,1000)', 'next_brand_id').getRawOne<any>();
	//	return data.next_brand_id;
	//}
}