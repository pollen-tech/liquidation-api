import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandRepository } from '../repositories/brand.repository';
import { BrandEntity } from '../repositories/brand.entity';
import { BrandCategoryRepository } from '../repositories/brand.category.repository';
import { BrandCategoryEntity } from '../repositories/brand.category.entity';
import { NewBrandDto, BrandMapper, CategoryDto, BrandDtoRes, BrandIdAndNameOnlyDto } from '../dto/brand.dto';
import { Status } from '../../../common/enums/common.enum';
import { ILike, Not } from 'typeorm';
import { PaginationParam } from 'src/common/pagination.entity';

@Injectable()
export class BrandService {
	constructor(
		private readonly brandRepository: BrandRepository,
		private readonly brandCategoryRepository: BrandCategoryRepository,
	) {
	}

	async isBrandNameTaken(name: string) {
		if (!name) {
			throw new BadRequestException('Brand name query param is required');
		}
		const existingBrand = await this.brandRepository.findOne({
			where: { name },
		});
		const isTaken = !!existingBrand;
		if (isTaken) {
			return {
				status_code: 400,
				message: 'Brand name is already taken',
				data: null,
			};
		}

		return {
			status_code: 200,
			message: 'Brand name is available',
			data: null,
		};
	}

	async createBrand(reqDto: NewBrandDto) {
		const isNameTaken = await this.isBrandNameTaken(reqDto.name);
		if (isNameTaken.status_code === 400) {
			throw new Error('Brand name already exists');
		}
		const brandEntity = await BrandMapper.toBrandEntity(reqDto);
		const savedBrand = await this.brandRepository.save(brandEntity);
		const categories = reqDto.brand_categories.flatMap((category) =>
			category.sub_categories.map((subCategory) => {
				const categoryEntity = new BrandCategoryEntity();
				categoryEntity.brand_id = savedBrand.id;
				categoryEntity.category_id = category.category_id;
				categoryEntity.category_name = category.category_name;
				categoryEntity.sub_category_id = subCategory.sub_category_id;
				categoryEntity.sub_category_name = subCategory.sub_category_name;
				return categoryEntity;
			}),
		);
		const saved_categories = await this.brandCategoryRepository.save(categories);
		return BrandMapper.toBrandResDto(savedBrand, saved_categories);
	}

	//async findAllBrands() {
	//	const saved_brands = await this.brandRepository.findAllByActiveStatus();
	//	return BrandMapper.toOnlyBrandResDtosWithoutCategory(saved_brands);
	//}

	async findAllBrandsWithCategories(paginationParam: PaginationParam) {
		//const savedBrands = await this.brandRepository.findAllByActiveStatus();
		const paginatedBrands = await this.brandRepository
			.getPaginatedBrandsByActiveStatus(paginationParam);

		const savedCategories = await this.brandCategoryRepository.find({
			where: { status: Status.ACTIVE },
		});

		console.log('savedCategories: ', savedCategories);

		const brandsWithCategories = this.getBrandsWithCategories(paginatedBrands.items, savedCategories);

		return {
			items: brandsWithCategories,
			currentPage: paginatedBrands.currentPage,
			totalItems: paginatedBrands.totalItems,
			totalPages: paginatedBrands.totalPages,
		};
	}

	async findAllBrandsWithIdAndNameOnly(): Promise<BrandIdAndNameOnlyDto[]> {
		const saved_brands = await this.brandRepository.findAllByActiveStatus();
		return saved_brands.map((savedBrand) => {
			return new BrandIdAndNameOnlyDto(savedBrand.id, savedBrand.name);
		});
	}

	async findByBrandId(id: string) {
		const savedBrand = await this.brandRepository.findOne({ where: { id, status: Not(Status.DELETED) } });
		const savedCategories = await this.brandCategoryRepository.find({
			where: { brand_id: savedBrand.id, status: Not(Status.DELETED) },
		});
		return BrandMapper.toBrandResDto(savedBrand, savedCategories);
	}

	async findAllBrandsByName(name: string) {
		const savedBrands = await this.brandRepository.find({ where: { name: ILike(`%${name}%`), status: Not(Status.DELETED) } });
		const savedCategories = await this.brandCategoryRepository.find({
			where: { status: Not(Status.DELETED) },
		});
		return this.getBrandsWithCategories(savedBrands, savedCategories);
	}

	async findBrandCategorywithBrandId(id: string): Promise<BrandCategoryEntity[]> {
		const savedBrand = await this.brandRepository.findOne({ where: { id, status: Not(Status.DELETED) } });
		const savedCategories = await this.brandCategoryRepository.find({
			where: { brand_id: savedBrand.id, status: Not(Status.DELETED) },
		});
		let groupedCategory = this.groupByCategory(savedCategories);

		if (!savedBrand) {
			throw new NotFoundException(`Brand with ID ${id} not found`);
		}
		return groupedCategory;
	}

	async updateBrand(id: string, updateBrandDto: NewBrandDto) {
		console.log('update: ', updateBrandDto);
		const brand = await this.brandRepository.findOne({ where: { id } });
		if (!brand) {
			throw new Error(`Brand with ID ${id} not found`);
		}

		// Merge existing entity with updated data
		const updatedBrand = this.brandRepository.merge(brand, updateBrandDto);
		updatedBrand.updated_on = Math.floor(Date.now() / 1000);
		const savedBrand = await this.brandRepository.save(updatedBrand);
		const categories = updateBrandDto.brand_categories.flatMap((category) =>
			category.sub_categories.map((subCategory) => {
				const categoryEntity = new BrandCategoryEntity();
				categoryEntity.brand_id = savedBrand.id;
				categoryEntity.category_id = category.category_id;
				categoryEntity.category_name = category.category_name;
				categoryEntity.sub_category_id = subCategory.sub_category_id;
				categoryEntity.sub_category_name = subCategory.sub_category_name;

				return categoryEntity;
			}),
		);
		let groupedCategory = this.groupByCategory(categories);
		await this.brandCategoryRepository.delete({ brand_id: savedBrand.id });
		const savedCategories = await this.brandCategoryRepository.save(categories);
		return BrandMapper.toBrandResDto(savedBrand, savedCategories);
	}

	async softDeleteBrand(id: string): Promise<void> {
		const brand = await this.brandRepository.findOne({ where: { id, status: Not(Status.DELETED) } });
		if (!brand) {
			throw new NotFoundException(`Brand with ID ${id} not found`);
		}
		brand.deleted_at = new Date();
		brand.status = Status.DELETED;
		await this.brandRepository.save(brand);
	}

	groupByCategory(categories: BrandCategoryEntity[]): BrandCategoryEntity[] {
		const groupedCategories = categories.reduce((acc, category) => {
			if (!acc[category.category_id]) {
				acc[category.category_id] = {
					category_id: category.category_id.toString(),
					category_name: category.category_name,
					sub_categories: [],
				};
			}
			acc[category.category_id].sub_categories.push({
				sub_category_id: category.sub_category_id.toString(),
				sub_category_name: category.sub_category_name,
			});
			return acc;
		}, {});
		return Object.values(groupedCategories);
	}
	getBrandsWithCategories(savedBrands: BrandEntity[], savedCategories: BrandCategoryEntity[]) {
		const categoriesByBrand = savedCategories.reduce((acc, category) => {
			if (!acc[category.brand_id]) {
				acc[category.brand_id] = [];
			}
			acc[category.brand_id].push(category);
			return acc;
		}, {} as { [brand_id: number]: BrandCategoryEntity[] });

		const brandsWithCategories = savedBrands.map((brand) => {
			const brandCategories = categoriesByBrand[brand.id] || [];
			return BrandMapper.toBrandResDto(brand, brandCategories);
		});
		return brandsWithCategories;
	}
}
