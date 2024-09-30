import {Type} from 'class-transformer';
import {IsArray, IsInt, IsMongoId, IsNotEmpty, IsPositive, IsUUID} from 'class-validator';

export class ArrayUuidDto {
    @IsNotEmpty()
    @IsArray()
    @IsUUID(undefined, {each: true})
    ids: string[];
}

export class SingleUuidDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;
}

export class SingleMongoIdDto {
    @IsNotEmpty()
    @IsMongoId()
    id: string;
}

export class ArrayMongoIdDto {
    @IsNotEmpty()
    @IsArray()
    @IsMongoId({each: true})
    ids: string[];
}

export class SingleNumberIdDto {
    @IsNotEmpty()
    @IsPositive()
    @IsInt()
    @Type(() => Number)
    id: number;
}

export class ArrayNumberIdDto {
    @IsNotEmpty()
    @IsArray()
    @IsPositive({each: true})
    @IsInt({each: true})
    @Type(() => Number)
    ids: number[];
}

export class ApiErrorResDto {
    status_code: number;
    status: string;
    message: string
    timestamp: string;
    path: string
    method: string;
}

export class ApiResDto {
    status_code: number;
    status: string;
    message?: string
    data?: {}
}