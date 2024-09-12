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
		const brandEntity = await BrandMapper.toBrandEntity(reqDto);
		const savedBrand = await this.brandRepository.save(brandEntity);
		// After saving, set the brand_id in BrandCategoryEntity
		const categories = reqDto.brand_category.flatMap(category =>
			category.sub_category.map(subCategory => {
				const categoryEntity = new BrandCategoryEntity();
				categoryEntity.brand_id = savedBrand.id; // Use the saved brand's id
				categoryEntity.category_id = category.category_id;
				categoryEntity.category_name = category.category_name;
				categoryEntity.sub_category_id = subCategory.sub_category_id;
				categoryEntity.sub_category_name = subCategory.sub_category_name;
				categoryEntity.status = Status.NA; // Default status
				return categoryEntity;
			})
		);
		await this.brandCategoryRepository.save(categories);
		console.log('savedBrand: ', savedBrand);
		console.log('categories: ', categories);

		return savedBrand;
	}

	//async createBrand(createBrandDto: NewBrandDto): Promise<BrandEntity> {
	//	const { brand_name, brand_image, brand_category } = createBrandDto;

	//	// Create and save categories and subcategories
	//	const categories = await Promise.all(
	//		brand_category.map(async categoryDto => {
	//			const { category_id, category_name, sub_category } = categoryDto;

	//			const subCategories = await Promise.all(
	//				sub_category.map(subCatDto => {
	//					const subCategory = this.brandSubCategoryRepository.create(subCatDto);
	//					return this.brandSubCategoryRepository.save(subCategory);
	//				})
	//			);

	//			const category = this.brandCategoryRepository.create({
	//				category_id: categoryDto.category_id,
	//				category_name: categoryDto.category_name,
	//				//subCategories,
	//			});
	//			category.brandSubCategories = categoryDto.sub_category.map(subCategoryDto => {
	//				return this.brandSubCategoryRepository.create({
	//					sub_category_id: subCategoryDto.sub_category_id,
	//					sub_category_name: subCategoryDto.sub_category_name,
	//				});
	//			});
	//			return this.brandCategoryRepository.save(category);
	//		})
	//	);

	//	// Create and save the brand
	//	const brand = this.brandRepository.create({
	//		brand_name,
	//		brand_image,
	//		categories,
	//	});

	//	return this.brandRepository.save(brand);
	//}

	//async create(createBrandDto: NewBrandDto): Promise<BrandEntity> {
	//	const brand = this.brandRepository.create(createBrandDto);
	//	return this.brandRepository.save(brand);
	//}

	//async create(brandDto: NewBrandDto) {
	//	let savedBrand = await this.createBrand(brandDto);
	//	await this.createBrandCategory(savedBrand.id, savedBrand);
	//	return savedBrand;
	//}

	//async createBrand(reqDto: NewBrandDto) {
	//	const entity = BrandMapper.toBrandEntity(reqDto);
	//	entity.id = await this.brandRepository.getNextBrandId();
	//	const saved = await this.brandRepository.save(entity);
	//	let res = { ...reqDto };
	//	res.id = saved.id;
	//	return res;
	//}

	//async createBrandCategory(brand_id: string, savedBrand: NewBrandDto) {
	//	let entity = { status: Status.ACTIVE, brand_id, ...savedBrand };
	//	return await this.brandCategoryRepository.save(entity);
	//}

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
		const brand = await this.brandRepository.findOne({ where: { id } });
		if (!brand) {
			throw new Error(`Brand with ID ${id} not found`);
		}

		// Merge existing entity with updated data
		const updatedBrand = this.brandRepository.merge(brand, updateBrandDto);
		updatedBrand.seq_no = brand.seq_no + 1;
		updatedBrand.updated_on = String(Math.floor(Date.now() / 1000));
		return this.brandRepository.save(updatedBrand);
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