import {Injectable} from '@nestjs/common';
import {Status} from '../../../common/enums/common.enum';
import {CompactProductRepository} from "../repositories/compact.product.repository";
import {ProductMapper, ProductPaginationParam, ProductResPage} from "../dto/product.dto";
import {ProductCategoryRepository} from "../repositories/product.category.repository";
import {ProductCategoryEntity} from "../repositories/product.category.entity";
import {CompactProductEntity} from "../repositories/compact.product.entity";

@Injectable()
export class CompactProductService {
    constructor(
        private readonly compactProductRepository: CompactProductRepository,
        private readonly productCategoryRepository: ProductCategoryRepository,
    ) {
    }

    async findAll() {
        return this.compactProductRepository.findBy({status: Status.ACTIVE})
    }

    async findAllByPageAndActiveStatus(paginationParam: ProductPaginationParam): Promise<ProductResPage> {
        const paginatedProducts = await this.compactProductRepository.getPaginatedProductsByActiveStatus(paginationParam);

        console.log("paginatedProducts", paginatedProducts);

        const productIds = paginatedProducts.items.map(item => item.id);
        const productCategories = await this.productCategoryRepository.findAllByProductIds(productIds);
        const productsWithCategories = this.getProductsWithCategories(paginatedProducts.items, productCategories);

        console.log("productsWithCategories*********", productsWithCategories);

        return {
            items: productsWithCategories,
            current_page: paginatedProducts.currentPage,
            total_items: paginatedProducts.totalItems,
            total_pages: paginatedProducts.totalPages,
        };
    }



    getProductsWithCategories(savedProducts: CompactProductEntity[], productCategories: ProductCategoryEntity[]) {
        const categoriesByProduct =
            productCategories.reduce((acc, category) => {
            if (!acc[category.product_id]) {
                acc[category.product_id] = [];
            }
            acc[category.product_id].push(category);
            return acc;
        }, {} as { [product_id: number]: ProductCategoryEntity[] });

        console.log("savedProducts", savedProducts);
        console.log("categoriesByProduct", categoriesByProduct);

        const productsWithCategories = savedProducts.map((product) => {
            const productCategories = categoriesByProduct[product.id] || [];

            console.log("productCategories", ProductMapper.toCompactProductResDto(product, productCategories));
            return ProductMapper.toCompactProductResDto(product, productCategories);
        });
        return productsWithCategories;
    }

}
