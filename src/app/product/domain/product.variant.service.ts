import {Injectable} from '@nestjs/common';
import {ProductVariantRepository} from "../repositories/product.variant.repository";
import {ProductVariantOptionEntity} from "../entity/product.variant.option.entity";

@Injectable()
export class ProductVariantService {
    constructor(private readonly productVariantRepository: ProductVariantRepository,
                private readonly productVariantOptionEntity: ProductVariantOptionEntity) {

    }



}
