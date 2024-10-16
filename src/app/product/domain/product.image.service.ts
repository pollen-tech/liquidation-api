import { Injectable } from '@nestjs/common';
import { Status } from '../../../common/enums/common.enum';
import { ProductImageDto, ProductImageMapper, ProductImageResDto } from '../dto/product.image.dto';
import { ProductImageRepository } from '../repositories/product.image.repository';

@Injectable()
export class ProductImageService {
    constructor(private readonly productImageRepository: ProductImageRepository) {}

    public async findAllByProductId(productIds: string[]) {
        const values = await this.productImageRepository.findAllByProductId(productIds);
        const result = values.map((item) => {
            return { product_id: item.product_id, product_image: item.image };
        });
        return result;
    }

    public async createByProductIdAndImage(productId: string, image: string) {
        const imageDto = new ProductImageDto();
        imageDto.product_id = productId;
        imageDto.image = image;
        return this.create(imageDto);
    }

    private async create(imageDto: ProductImageDto) {
        /* Delete all by id if exists */
        await this.productImageRepository.softDeleteByProductId(imageDto.product_id);

        const entity = ProductImageMapper.toEntity(imageDto);
        /* Save the image */
        const savedEntity = await this.productImageRepository.save(entity);
        imageDto.id = savedEntity.id;
        return imageDto;
    }

    public async findByProductId(productId: string, productName: string) {
        return await this.productImageRepository
            .findBy({ product_id: productId, status: Status.ACTIVE })
            .then((images) => ProductImageMapper.toDtos(images))
            .then((imageDtos) => {
                const dto: ProductImageResDto = {
                    product_name: productName,
                    product_id: productId,
                    images: imageDtos,
                };
                return dto;
            });
    }
}
