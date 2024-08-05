import { UserEntity } from '../repositories/user.entity';
import { ChannelName, Status } from '../../../common/enums/common.enum';
import { IsNotEmpty } from 'class-validator';
import { Param, Query } from '@nestjs/common';

export class NewUsersDto {
    @IsNotEmpty()
    auth_id: string;

    @IsNotEmpty()
    auth_ref_id: string;

    @IsNotEmpty()
    channel: ChannelName;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    country_code: number;

    @IsNotEmpty()
    phone_no: number;

    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    user_id: string;

    @IsNotEmpty()
    pollen_pass_id: number;

    @IsNotEmpty()
    phone_verified: boolean;
}

export class UserDtoRes {
    status_code: string = 'OK';
    desc: string;
    data: NewUsersDto | ChannelNewUsersDto;

    setDto(data: any) {
        this.data = data;
        return this;
    }
}

export class ValidatePasswordLessUserReqDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    code: string;

    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    incoming_channel: ChannelName;
}

export class ChannelNewUsersDto {
    @IsNotEmpty()
    auth_ref_id: string;

    @IsNotEmpty()
    auth_id: string;

    @IsNotEmpty()
    channel: ChannelName;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    user_id: string;

    @IsNotEmpty()
    pollen_pass_id: number;

    @IsNotEmpty()
    phone_verified: boolean;
}

export class PasswordLessNewUsersDto extends ChannelNewUsersDto {
    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;
}

export class UserMapper {
    static convertToNewEntity(dto: NewUsersDto) {
        let entity = new UserEntity();
        entity.auth_id = dto.auth_id;
        entity.auth_ref_id = dto.auth_ref_id;
        entity.channel = dto.channel.toUpperCase();
        entity.email = dto.email.toLowerCase();
        entity.country_code = dto.country_code;
        entity.phone_no = dto.phone_no;
        entity.first_name = dto.first_name;
        entity.last_name = dto.last_name;
        entity.id = null; /* new one must be null */
        entity.status = Status.ACTIVE;
        if (dto.pollen_pass_id) {
            entity.pollen_pass_id = dto.pollen_pass_id;
        }
        return entity;
    }

    static convertToNewEntityWhenOnboard(dto: ChannelNewUsersDto | PasswordLessNewUsersDto | any) {
        let entity = new UserEntity();
        entity.auth_id = dto.auth_id;
        entity.auth_ref_id = dto.auth_ref_id;
        entity.channel = dto.channel.toUpperCase();
        entity.email = dto.email.toLowerCase();
        entity.id = null; /* new one must be null */
        entity.status = Status.ACTIVE;

        if (dto.first_name) {
            entity.first_name = dto.first_name;
        }
        if (dto.last_name) {
            entity.last_name = dto.last_name;
        }
        return entity;
    }

    static convertToDto(entity: UserEntity) {
        if (!entity) {
            return null;
        }
        let dto = new NewUsersDto();
        dto.auth_id = entity.auth_id;
        dto.auth_ref_id = entity.auth_ref_id;
        dto.email = entity.email.toLowerCase();
        dto.country_code = entity.country_code;
        dto.phone_no = entity.phone_no;
        dto.first_name = entity.first_name;
        dto.last_name = entity.last_name;
        dto.user_id = entity.id;
        dto.phone_verified = entity.phone_verified;
        dto.pollen_pass_id = entity.pollen_pass_id;
        return dto;
    }

    static convertToChannelsOnly(entities: UserEntity[]) {
        let dtos = [];
        entities.forEach((item) => {
            dtos.push({ user_id: item.id, channel: item.channel, created_at: item.created_at });
        });
        return dtos;
    }
}
