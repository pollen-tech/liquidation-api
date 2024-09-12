import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandRepository } from '../repositories/brand.repository';
import { BrandEntity } from '../repositories/brand.entity';
import { BrandCategoryRepository } from '../repositories/brand.category.repository';
import { BrandCategoryEntity } from '../repositories/brand.category.entity';
import { NewBrandDto, BrandMapper } from '../dto/brand.dto';
import { Status } from '../../../common/enums/common.enum';


@Injectable()
export class BrandService {
	constructor(
		@InjectRepository(BrandEntity)
		private readonly brandRepository: BrandRepository,
		@InjectRepository(BrandCategoryEntity)
		private readonly brandCategoryRepository: BrandCategoryRepository,
	) { }

	async createBrand(reqDto: NewBrandDto) {
		console.log('createBrand: ', reqDto);
		const brandEntity = await BrandMapper.toBrandEntity(reqDto);
		const savedBrand = await this.brandRepository.save(brandEntity);
		//console.log('brandEntity: ', brandEntity);
		console.log('savedBrand: ', savedBrand);


		// After saving, set the brand_id in BrandCategoryEntity
		const categories = reqDto.brand_category.flatMap(category =>
			category.sub_category.map(subCategory => {
				const categoryEntity = new BrandCategoryEntity();

				categoryEntity.brand_id = savedBrand.id;
				categoryEntity.category_id = category.category_id;
				categoryEntity.category_name = category.category_name;
				categoryEntity.sub_category_id = subCategory.sub_category_id;
				categoryEntity.sub_category_name = subCategory.sub_category_name;
				console.log('createBrand_categoryEntity: ', categoryEntity);

				return categoryEntity;
			})
		);
		console.log('categories: ', categories);

		await this.brandCategoryRepository.save(categories);
		console.log('savedBrand: ', savedBrand);
		console.log('categories: ', categories);

		//return savedBrand;
		let res: any;
		res = savedBrand;
		res.brand_categories = categories;
		console.log(res);

		return res;
	}

	async findAll(): Promise<BrandEntity[]> {
		const savedBrand = await this.brandRepository.find({ where: { deleted_at: null } });

		for (const brand of savedBrand) {
			const savedCategories = await this.brandCategoryRepository.find({
				where: { brand_id: brand.id, deleted_at: null },
			});

			brand['brand_categories'] = savedCategories;
		}
		return savedBrand;
	}

	async findOne(id: string): Promise<BrandEntity> {
		const savedBrand = await this.brandRepository.findOne({ where: { id, deleted_at: null } });
		const savedCategories = await this.brandCategoryRepository.find({
			where: { brand_id: savedBrand.id, deleted_at: null },
		});
		savedBrand['brand_categories'] = savedCategories;
		if (!savedBrand) {
			throw new NotFoundException(`Brand with ID ${id} not found`);
		}
		return savedBrand;
	}

	async update(id: string, updateBrandDto: NewBrandDto): Promise<BrandEntity> {
		console.log('update: ', updateBrandDto);
		const brand = await this.brandRepository.findOne({ where: { id } });
		if (!brand) {
			throw new Error(`Brand with ID ${id} not found`);
		}

		// Merge existing entity with updated data
		const updatedBrand = this.brandRepository.merge(brand, updateBrandDto);
		updatedBrand.updated_on = Math.floor(Date.now() / 1000);
		const savedBrand = await this.brandRepository.save(updatedBrand);
		const categories = updateBrandDto.brand_category.flatMap(category =>
			category.sub_category.map(subCategory => {
				const categoryEntity = new BrandCategoryEntity();
				categoryEntity.brand_id = savedBrand.id;
				categoryEntity.category_id = category.category_id;
				categoryEntity.category_name = category.category_name;
				categoryEntity.sub_category_id = subCategory.sub_category_id;
				categoryEntity.sub_category_name = subCategory.sub_category_name;

				console.log('updateBrand_categoryEntity: ', categoryEntity);
				return categoryEntity;
			})
		);
		// Remove existing categories for the brand
		await this.brandCategoryRepository.delete({ brand_id: savedBrand.id });

		// Save the updated categories
		await this.brandCategoryRepository.save(categories);

		let res: any;
		res = savedBrand;
		res.brand_categories = categories;
		console.log(res);

		return res;
	}

	async softDelete(id: string): Promise<void> {
		const brand = await this.brandRepository.findOne({ where: { id, deleted_at: null } });
		if (!brand) {
			throw new NotFoundException(`Brand with ID ${id} not found`);
		}
		brand.deleted_at = new Date();
		brand.status = Status.DELETED;
		await this.brandRepository.save(brand);
	}
}