import { Equal, FindManyOptions, ILike, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository, SelectQueryBuilder } from 'typeorm';
import { RequestContext } from '../../../request-context/request-context';
import { Paginated, PaginationParam } from '../../../common/pagination.entity';

export type FilterOperation = 'gte' | 'lte' | 'gt' | 'lt' | 'eq' | 'con';

export function isFilterOperation(value: string): value is FilterOperation {
    return ['gte', 'lte', 'gt', 'lt', 'eq', 'con'].includes(value);
}

export function getOperationQueryStr(operation: FilterOperation) {
    switch (operation) {
        case 'gte':
            return '>=';
        case 'lte':
            return '<=';
        case 'gt':
            return '>';
        case 'lt':
            return '<';
        case 'eq':
            return '=';
        case 'con':
            return 'ILIKE';
    }
}

export function getOperationQuery<T>(operation: FilterOperation, value: T) {
    switch (operation) {
        case 'gte':
            return MoreThanOrEqual(value);
        case 'lte':
            return LessThanOrEqual(value);
        case 'gt':
            return MoreThan(value);
        case 'lt':
            return LessThan(value);
        case 'eq':
            return Equal(value);
        case 'con':
            return ILike(`%${value}%`);
    }
}

export default class BaseRepository<T> extends Repository<T> {
    protected getRepository() {
        return RequestContext.getContext().transaction ? RequestContext.getContext().transaction.getRepository(this.target) : this;
    }
    async getPaginated(paginationParam: PaginationParam, opts: FindManyOptions<T> = {}): Promise<Paginated<T>> {
        let { page, size } = paginationParam;
        page = Number(page) || 1; 
        size = Number(size) || 25;
        if (page < 1) {
            page = 1;
        }
        if (size < 1) {
            size = 25;
        }
        opts.skip = (page - 1) * size;
        opts.take = size;
        const [items, totalItems] = await this.findAndCount(opts);
        return {
            items,
            currentPage: page,
            totalItems,
            totalPages: Math.ceil(totalItems / size),
        };
    }

    async getPaginatedBuilder(paginationParam: PaginationParam, queryBuilder: SelectQueryBuilder<T>): Promise<Paginated<T>> {
        const { page, size } = paginationParam;
        queryBuilder.skip((page - 1) * size);
        queryBuilder.take(size);
        const [items, totalItems] = await queryBuilder.getManyAndCount();
        return {
            items,
            currentPage: page,
            totalItems,
            totalPages: Math.ceil(totalItems / size),
        };
    }
}
