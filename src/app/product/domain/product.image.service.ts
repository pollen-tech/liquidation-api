import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ProductRepository} from '../repositories/product.repository';
import {ProductEntity} from '../repositories/product.entity';
import {ProductCategoryRepository} from '../repositories/product.category.repository';
import {ProductCategoryEntity} from '../repositories/product.category.entity';
import {UserProductRepository} from '../repositories/user.product.repository';
import {UserProductEntity} from '../repositories/user.product.entity';
import {NewProductDto, ProductApiResDto, ProductMapper, UpdateProductDto} from '../dto/product.dto';
import {Status} from '../../../common/enums/common.enum';
import {ILike, Not} from 'typeorm';
import {PaginationParam} from 'src/common/pagination.entity';
import {ProductImageDto, ProductImageMapper} from "../dto/product.image.dto";
import {ProductImageRepository} from "../repositories/product.image.repository";

@Injectable()
export class ProductImageService {
    constructor(
        private readonly productImageRepository: ProductImageRepository,
    ) {
    }

    public async create(imageDto: ProductImageDto) {
        /* Delete all by id if exists */
        await this.productImageRepository.softDeleteByProductId(imageDto.product_id);

        const entity = ProductImageMapper.toEntity(imageDto);
        /* Save the image */
        const savedEntity = await this.productImageRepository.save(entity);
        imageDto.id = savedEntity.id
        return imageDto;
    }

}
