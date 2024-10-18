class NewProductVariantDto {
    product_id: string;
    product_name: string;
    pollen_sku: string;
    user_name: string;
    user_id: string;
    variants: NewVariantDto[];
}

class NewVariantDto {
    image: string;
    variant_sku: string;
    sku: string;
    type: string;
    color: string;
    size: string;
    status: string;
}

class ProductVariantDto extends NewProductVariantDto {
    id: string;
}

class VariantDto extends NewVariantDto {
    id: string;
}

class VariantOptionDto {
    types: string[];
    colors: string[];
    sizes: string[];
}

