import { IsNotEmpty } from 'class-validator';
import { Optional } from '@nestjs/common';
import { Status } from '../../../common/enums/common.enum';
import { BrandEntity } from '../repositories/brand.entity';

export class NewBrandDto {
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	category_id: string;

	@IsNotEmpty()
	category_name: string;

	@IsNotEmpty()
	sub_category_id: string;

	@IsNotEmpty()
	sub_category_name: string;

	@IsNotEmpty()
	status: Status;

	@Optional()
	image: string;
}

export class BrandMapper {
	static toDto(entity: BrandEntity): NewBrandDto {
		return {
			name: entity.name,
			category_id: entity.category_id,
			category_name: entity.category_name,
			sub_category_id: entity.sub_category_id,
			sub_category_name: entity.sub_category_name,
			status: entity.status,
			image: entity.image
		};
	}
}