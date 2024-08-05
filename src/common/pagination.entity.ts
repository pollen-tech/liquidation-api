import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsPositive, IsString, isBoolean } from 'class-validator';

export interface Paginated<T> {
    totalItems: number;
    items: T[];
    totalPages: number;
    currentPage: number;
}

export enum Order {
    Asc = 'ASC',
    Desc = 'DESC',
}

export class FilterParam {
    @IsOptional()
    @IsString()
    @IsIn(Object.values(Order))
    order?: Order;

    @IsOptional()
    @IsString()
    orderBy?: string;

    /**
     * filter query string array with format <mark>type:field:operation:value</mark><br>
     *
     * operation values: 'gte' | 'lte' | 'gt' | 'lt' | 'eq' | 'con'
     * @example ['number:age:gte:15']
     */
    @Transform(({ value }) => {
        if (value && !Array.isArray(value)) {
            return [value];
        } else {
            return value;
        }
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    filter?: string[];
}

export class PaginationParam extends FilterParam {
    @IsInt()
    @IsPositive()
    @Transform(({ value }) => (value && parseInt(value, 10)) || 1)
    page = 1;

    @IsInt()
    @IsPositive()
    @Transform(({ value }) => (value && parseInt(value, 10)) || 25)
    size = 25;

    @IsOptional()
    @Transform(({ value }) => {
        if (isBoolean(value)) {
            return value;
        }

        return value === 'true';
    })
    @IsBoolean()
    enablePagination = true;
}
