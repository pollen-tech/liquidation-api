import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from '../repositories/product.repository';
import { ProductEntity } from '../repositories/product.entity';
import { ProductCategoryRepository } from '../repositories/product.category.repository';
import { ProductCategoryEntity } from '../repositories/product.category.entity';
import { NewProductDto, ProductMapper, ProductResDto } from '../dto/product.dto';
import { Status } from '../../../common/enums/common.enum';
import { Not } from 'typeorm';


@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(ProductEntity)
		private readonly productRepository: ProductRepository,
		@InjectRepository(ProductCategoryEntity)
		private readonly productCategoryRepository: ProductCategoryRepository,
	) { }

	async createProduct(reqDto: NewProductDto) {
		console.log('createProduct: ', reqDto);
		const productEntity = await ProductMapper.toProductEntity(reqDto);
		const savedProduct = await this.productRepository.save(productEntity);

		const categories = reqDto.product_category.flatMap(category =>
			category.sub_category.map(subCategory => {
				const categoryEntity = new ProductCategoryEntity();

				categoryEntity.product_id = savedProduct.id;
				categoryEntity.category_id = category.category_id;
				categoryEntity.category_name = category.category_name;
				categoryEntity.sub_category_id = subCategory.sub_category_id;
				categoryEntity.sub_category_name = subCategory.sub_category_name;
				categoryEntity.sub_category_description = subCategory.sub_category_description;
				console.log('createProduct_categoryEntity: ', categoryEntity);

				return categoryEntity;
			})
		);
		let groupedCategory = this.groupByCategory(categories);

		await this.productCategoryRepository.save(categories);
		console.log('savedBrand: ', savedProduct);
		console.log('categories: ', groupedCategory);

		let res: any;
		res = savedProduct;
		res.product_categories = groupedCategory;
		console.log(res);

		return res;
	}

	async findAllProducts(): Promise<ProductEntity[]> {
		const savedProduct = await this.productRepository.find({ where: { status: Not(Status.DELETED) } });
		return savedProduct;
	}

	async findProductwithProductId(id: string): Promise<ProductEntity> {
		const savedProduct = await this.productRepository.findOne({ where: { id, status: Not(Status.DELETED) } });
		const savedCategories = await this.productCategoryRepository.find({
			where: { product_id: savedProduct.id },
		});
		let groupedCategory = this.groupByCategory(savedCategories);
		savedProduct['product_categories'] = groupedCategory;

		if (!savedProduct) {
			throw new NotFoundException(`Product with ID ${id} not found`);
		}
		return savedProduct;
	}

	async findProductCategorywithProductId(id: string): Promise<ProductResDto[]> {
		const savedProduct = await this.productRepository.findOne({ where: { id, status: Not(Status.DELETED) } });
		const savedCategories = await this.productCategoryRepository.find({
			where: { product_id: savedProduct.id },
		});
		let groupedCategory = this.groupByCategory(savedCategories);
		if (!savedProduct) {
			throw new NotFoundException(`Product with ID ${id} not found`);
		}
		return groupedCategory;
	}

	async updateProduct(id: string, updateProductDto: NewProductDto): Promise<ProductEntity> {
		console.log('update: ', updateProductDto);
		const product = await this.productRepository.findOne({ where: { id } });
		if (!product) {
			throw new Error(`Product with ID ${id} not found`);
		}

		// Merge existing entity with updated data
		const updatedProduct = this.productRepository.merge(product, updateProductDto);
		//updatedProduct.updated_on = Math.floor(Date.now() / 1000);
		const savedProduct = await this.productRepository.save(updatedProduct);
		const categories = updateProductDto.product_category.flatMap(category =>
			category.sub_category.map(subCategory => {
				const categoryEntity = new ProductCategoryEntity();
				categoryEntity.product_id = savedProduct.id;
				categoryEntity.category_id = category.category_id;
				categoryEntity.category_name = category.category_name;
				categoryEntity.sub_category_id = subCategory.sub_category_id;
				categoryEntity.sub_category_name = subCategory.sub_category_name;
				categoryEntity.sub_category_description = subCategory.sub_category_description;

				console.log('updateProduct_categoryEntity: ', categoryEntity);
				return categoryEntity;
			})
		);
		let groupedCategory = this.groupByCategory(categories);
		await this.productCategoryRepository.delete({ product_id: savedProduct.id });
		await this.productCategoryRepository.save(categories);

		let res: any;
		res = savedProduct;
		res.product_categories = groupedCategory;
		console.log(res);

		return res;
	}

	async softDeleteProduct(id: string): Promise<void> {
		const product = await this.productRepository.findOne({ where: { id, status: Not(Status.DELETED) } });
		if (!product) {
			throw new NotFoundException(`Product with ID ${id} not found`);
		}
		product.status = Status.DELETED;
		await this.productRepository.save(product);
	}

	groupByCategory(categories: ProductCategoryEntity[]): ProductResDto[] {
		const groupedCategories = categories.reduce((acc, category) => {
			if (!acc[category.category_id]) {
				acc[category.category_id] = {
					category_id: category.category_id.toString(),
					category_name: category.category_name,
					sub_category: []
				};
			}
			acc[category.category_id].sub_category.push({
				category_id: category.category_id.toString(),
				sub_category_id: category.sub_category_id.toString(),
				sub_category_name: category.sub_category_name,
				sub_category_description: category.sub_category_description
			});
			return acc;
		}, {});
		return Object.values(groupedCategories);
	}
}