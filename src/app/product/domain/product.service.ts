import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from '../repositories/product.repository';
import { ProductEntity } from '../repositories/product.entity';
import { ProductCategoryRepository } from '../repositories/product.category.repository';
import { ProductCategoryEntity } from '../repositories/product.category.entity';
import { UserProductRepository } from '../repositories/user.product.repository';
import { UserProductEntity } from '../repositories/user.product.entity';
import { NewProductDto, ProductApiResDto, ProductMapper } from '../dto/product.dto';
import { Status } from '../../../common/enums/common.enum';
import { ILike, Not } from 'typeorm';
import { PaginationParam } from 'src/common/pagination.entity';

@Injectable()
export class ProductService {
	constructor(
		private readonly productRepository: ProductRepository,
		private readonly productCategoryRepository: ProductCategoryRepository,
		private readonly userProductRepository: UserProductRepository
	) { }

	async isProductNameTaken(name: string) {
		if (!name) {
			throw new BadRequestException('Product name query param is required');
		}
		const existingProduct = await this.productRepository.findOne({
			where: { name },
		});
		const isTaken = !!existingProduct;
		if (isTaken) {
			return {
				status_code: 400,
				message: 'Product name is already taken',
				data: null,
			};
		}

		return {
			status_code: 200,
			message: 'Product name is available',
			data: null,
		};
	}

	async createProduct(reqDto: NewProductDto) {
		const isNameTaken = await this.isProductNameTaken(reqDto.name);
		if (isNameTaken.status_code === 400) {
			throw new Error('Product name already exists');
		}
		const productEntity = await ProductMapper.toProductEntity(reqDto);
		const next_seq_no = await this.productRepository.getNextSeqNo();
		productEntity.seq_no = next_seq_no;
		const savedProduct = await this.productRepository.save(productEntity);

		const categories = reqDto.product_categories.flatMap((category) => {
			if (!category.sub_categories || category.sub_categories.length === 0) {
				const categoryEntity = new ProductCategoryEntity();
				categoryEntity.product_id = savedProduct.id;
				categoryEntity.category_id = category.category_id;
				categoryEntity.category_name = category.category_name;
				categoryEntity.sub_category_id = null;
				categoryEntity.sub_category_name = '';
				categoryEntity.sub_category_description = '';
				return [categoryEntity];
			}

			return (category.sub_categories || []).map((subCategory) => {
				const categoryEntity = new ProductCategoryEntity();
				categoryEntity.product_id = savedProduct.id;
				categoryEntity.category_id = category.category_id;
				categoryEntity.category_name = category.category_name;
				categoryEntity.sub_category_id = subCategory.sub_category_id;
				categoryEntity.sub_category_name = subCategory.sub_category_name;
				categoryEntity.sub_category_description = subCategory.sub_category_description;
				return categoryEntity;
			});
		});
		const saved_categories = await this.productCategoryRepository.save(categories);
		const userProductEntity = new UserProductEntity();
		userProductEntity.user_id = reqDto.user_id;
		userProductEntity.product_id = savedProduct.id;
		await this.userProductRepository.save(userProductEntity);

		//let categories_dto = ProductMapper.groupByCategoryDto(saved_categories);
		return ProductMapper.toProductResDto(savedProduct, saved_categories);
	}

	async findAllProducts() {
		const savedProduct = await this.productRepository.find({ where: { status: Not(Status.DELETED) } });
		return savedProduct;
	}

	//async findAllProductsWithCategories() {
	//	const savedProducts = await this.productRepository.findAllByActiveStatus();
	//	const savedCategories = await this.productCategoryRepository.find({
	//		where: { status: Not(Status.DELETED) },
	//	});
	//	return this.getProductsWithCategories(savedProducts, savedCategories);
	//}

	async findAllProductsWithCategories(paginationParam: PaginationParam) {
		const paginatedProducts = await this.productRepository.getPaginated(
			paginationParam,
			{ where: { status: Status.ACTIVE } }
		);

		const savedCategories = await this.productCategoryRepository.find({
			where: { status: Status.ACTIVE },
		});

		const productsWithCategories = this.getProductsWithCategories(paginatedProducts.items, savedCategories);

		return {
			items: productsWithCategories,
			currentPage: paginatedProducts.currentPage,
			totalItems: paginatedProducts.totalItems,
			totalPages: paginatedProducts.totalPages,
		};
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

	async findAllProductsByName(name: string) {
		const savedProducts = await this.productRepository.find({ where: { name: ILike(`%${name}%`), status: Not(Status.DELETED) } });
		const savedCategories = await this.productCategoryRepository.find({
			where: { status: Not(Status.DELETED) },
		});
		return this.getProductsWithCategories(savedProducts, savedCategories);
	}

	async findProductCategorywithProductId(id: string) {
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
		const updatedProduct = this.productRepository.merge(product, updateProductDto);
		const savedProduct = await this.productRepository.save(updatedProduct);

		const categories = updateProductDto.product_categories.flatMap((category) => {
			if (!category.sub_categories || category.sub_categories.length === 0) {
				const categoryEntity = new ProductCategoryEntity();
				categoryEntity.product_id = savedProduct.id;
				categoryEntity.category_id = category.category_id;
				categoryEntity.category_name = category.category_name;
				categoryEntity.sub_category_id = null;
				categoryEntity.sub_category_name = '';
				categoryEntity.sub_category_description = '';
				return [categoryEntity];
			}
			return (category.sub_categories).map((subCategory) => {
				const categoryEntity = new ProductCategoryEntity();
				categoryEntity.product_id = savedProduct.id;
				categoryEntity.category_id = category.category_id;
				categoryEntity.category_name = category.category_name;
				categoryEntity.sub_category_id = subCategory.sub_category_id;
				categoryEntity.sub_category_name = subCategory.sub_category_name;
				categoryEntity.sub_category_description = subCategory.sub_category_description;

				console.log('updateProduct_categoryEntity: ', categoryEntity);
				return categoryEntity;
			});
		});
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

	groupByCategory(categories: ProductCategoryEntity[]): ProductApiResDto[] {
		const groupedCategories = categories.reduce((acc, category) => {
			if (!acc[category?.category_id]) {
				acc[category.category_id] = {
					category_id: category.category_id.toString(),
					category_name: category.category_name,
					sub_categories: [],
				};
			}
			acc[category.category_id].sub_categories.push({
				category_id: category.category_id.toString(),
				sub_category_id: category.sub_category_id,
				sub_category_name: category.sub_category_name,
				sub_category_description: category.sub_category_description ? category.sub_category_description : '',
			});
			return acc;
		}, {});
		return Object.values(groupedCategories);
	}
	getProductsWithCategories(savedProducts: ProductEntity[], savedCategories: ProductCategoryEntity[]) {
		const categoriesByProduct = savedCategories.reduce((acc, category) => {
			if (!acc[category.product_id]) {
				acc[category.product_id] = [];
			}
			acc[category.product_id].push(category);
			return acc;
		}, {} as { [product_id: number]: ProductCategoryEntity[] });

		const productsWithCategories = savedProducts.map((product) => {
			const productCategories = categoriesByProduct[product.id] || [];
			return ProductMapper.toProductResDto(product, productCategories);
		});
		return productsWithCategories;
	}
}
