import { Injectable, NotFoundException } from '@nestjs/common';
import { BrandRepository } from '../repositories/brand.repository';
import { BrandEntity } from '../repositories/brand.entity';
import { NewBrandDto } from '../dto/brand.dto';


@Injectable()
export class BrandService {
	constructor(
		private readonly brandRepository: BrandRepository,
	) { }

	async create(createBrandDto: NewBrandDto): Promise<BrandEntity> {
		const brand = this.brandRepository.create(createBrandDto);
		return this.brandRepository.save(brand);
	}

	async findAll(): Promise<BrandEntity[]> {
		return this.brandRepository.find({ where: { deleted_at: null } });
	}

	async findOne(id: string): Promise<BrandEntity> {
		const brand = await this.brandRepository.findOne({ where: { id, deleted_at: null } });
		if (!brand) {
			throw new NotFoundException(`Brand with ID ${id} not found`);
		}
		return brand;
	}

	async update(id: string, updateBrandDto: NewBrandDto): Promise<BrandEntity> {
		const brand = await this.brandRepository.preload({
			id,
			...updateBrandDto,
		});
		if (!brand) {
			throw new NotFoundException(`Brand with ID ${id} not found`);
		}
		return this.brandRepository.save(brand);
	}

	async softDelete(id: string): Promise<void> {
		const brand = await this.brandRepository.findOne({ where: { id, deleted_at: null } });
		if (!brand) {
			throw new NotFoundException(`Brand with ID ${id} not found`);
		}
		brand.deleted_at = new Date();
		await this.brandRepository.save(brand);
	}
}