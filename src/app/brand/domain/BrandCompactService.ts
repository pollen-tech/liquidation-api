import { Injectable, NotFoundException } from '@nestjs/common';
import { BrandRepository } from '../repositories/brand.repository';
import { BrandCategoryRepository } from '../repositories/brand.category.repository';
import { BrandCompactDto } from '../dto/brand.dto';
import { BrandPaginationParam } from '../dto/brand.dto';


@Injectable()
export class BrandCompactService {
    constructor(
        private readonly brandRepository: BrandRepository,
        private readonly brandCategoryRepository: BrandCategoryRepository,
    ) {}

    async findAllActive(paginationParam: BrandPaginationParam) {
        const entities = await this.brandRepository.findAllByActiveStatusOrderByName(paginationParam);
        if (entities == null || entities.length === 0) {
            throw new NotFoundException('Brands not found');
        }
        return entities.map((item) => new BrandCompactDto(item.id, item.name));
    }
}
