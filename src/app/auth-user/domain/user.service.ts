import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { ChannelNewUsersDto, NewUsersDto, PasswordLessNewUsersDto, UserDtoRes, UserMapper } from '../dto/users.dto';
import { UserEntity } from '../repositories/user.entity';
import { EmailNotificationService } from '../../notify/domain/email.notification.service';
import { WelcomeEmailDto } from '../../notify/dto/email.dto';
import { formatDateAsDDMMYYYY } from '../../../common/date-format';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private emailNotificationService: EmailNotificationService,
    ) {}

    async sendEmailNotification(user_id: string) {
        const user = await this.userRepository.findOneByOrFail({ id: user_id });
        const email_dto: WelcomeEmailDto = {
            name: user.first_name + ' ' + user.last_name,
            email: user.email,
            phoneNumber: '+' + user.country_code + user.phone_no,
            pollenPassId: user.pollen_pass_id.toString(),
            createdAt: formatDateAsDDMMYYYY(user.created_at),
            siteLink: 'https://staging.direct.pollen.tech',
        };
        return await this.emailNotificationService.sendWelcomeEmail(email_dto);
    }

    async findOneById(id: string) {
        let data = await this.userRepository.findOneByOrFail({ id: id });
        return UserMapper.convertToDto(data);
    }

    async findAllForChannel(user_id: string) {
        let entities = await this.userRepository.getChannels(user_id);
        return UserMapper.convertToChannelsOnly(entities);
    }

    async findPollenPassOneByUserId(user_id: string, email: string) {
        if (user_id) {
            return await this.userRepository.getPollenPassUserByUserId(user_id).then(UserMapper.convertToDto);
        } else if (email) {
            return await this.userRepository.getPollenPassUserByEmail(email).then(UserMapper.convertToDto);
        } else {
            return null;
        }
    }

    async updatePhoneNoAndVerification(user_id: string, country_code: number, phone_no: number, phone_verified: boolean) {
        return this.userRepository.update({ id: user_id }, { country_code, phone_no, phone_verified });
    }

    async createIfNotExistByEmailAndChannel(requestDTO: NewUsersDto) {
        let email = requestDTO.email;
        let channel = requestDTO.channel;

        let existingUser = await this.userRepository.findOne({ where: { email, channel } });
        if (!existingUser) {
            return this.create(requestDTO);
        } else {
            let resDto = new UserDtoRes();
            requestDTO.user_id = existingUser.id;
            resDto.status_code = '200';
            resDto.data = requestDTO;
            resDto.desc = 'User account exists in Pollen system.';
            return resDto;
        }
    }

    async create(requestDTO: NewUsersDto) {
        let entity = UserMapper.convertToNewEntity(requestDTO);
        let savedEntity = await this.userRepository.save(entity);
        requestDTO.user_id = savedEntity.id;
        let resDto = new UserDtoRes();
        resDto.status_code = '200';
        resDto.data = requestDTO;
        return resDto;
    }

    async createByAuthIdAndChannelIfNotExist(requestDTO: NewUsersDto) {
        let existingEntity = await this.userRepository.findOne({
            where: {
                auth_id: requestDTO.auth_id,
                channel: requestDTO.channel,
            },
        });
        if (existingEntity) {
            requestDTO.user_id = existingEntity.id;
            requestDTO.pollen_pass_id = existingEntity.pollen_pass_id;
            requestDTO.phone_verified = existingEntity.phone_verified;
        } else {
            let entity = UserMapper.convertToNewEntity(requestDTO);
            let savedEntity = await this.userRepository.save(entity);
            requestDTO.user_id = savedEntity.id;
        }
        return requestDTO;
    }

    async createOrUpdateWhenChannelOnboard(requestDTO: ChannelNewUsersDto) {
        /* find if user exists */
        let existingEntity = await this.userRepository.findOne({
            where: {
                auth_id: requestDTO.auth_id,
                channel: requestDTO.channel,
            },
        });
        if (existingEntity) {
            requestDTO.user_id = existingEntity.id;
            requestDTO.pollen_pass_id = existingEntity.pollen_pass_id;
            requestDTO.phone_verified = existingEntity.phone_verified;
        } else {
            let new_entity = UserMapper.convertToNewEntityWhenOnboard(requestDTO);
            let pollen_pass_entity = await this.userRepository.getPollenPassUserByAuthId(requestDTO.auth_id);
            /* update personal details from pollen pass */
            this.updatePollenPassDetailToOther(pollen_pass_entity, new_entity);
            let savedEntity = await this.userRepository.save(new_entity);
            requestDTO.user_id = savedEntity.id;
        }
        return requestDTO;
    }

    async createOrUpdateWhenPollenPassChannel(requestDTO: PasswordLessNewUsersDto) {
        /* find if user exists */
        let existingEntity = await this.userRepository.findOne({
            where: {
                auth_id: requestDTO.auth_id,
                channel: requestDTO.channel,
            },
        });
        if (existingEntity) {
            requestDTO.user_id = existingEntity.id;
            requestDTO.pollen_pass_id = existingEntity.pollen_pass_id;
        } else {
            let entity = UserMapper.convertToNewEntityWhenOnboard(requestDTO);
            entity.pollen_pass_id = await this.userRepository.getMaxPollenPassIdValue();
            let savedEntity = await this.userRepository.save(entity);
            requestDTO.user_id = savedEntity.id;
            requestDTO.pollen_pass_id = savedEntity.pollen_pass_id;
            requestDTO.phone_verified = savedEntity.phone_verified;
        }
        return requestDTO;
    }

    private updatePollenPassDetailToOther(pollen_pass_entity: UserEntity, new_entity: UserEntity) {
        if (!pollen_pass_entity) {
            /* if pollen pass entity does not exist, then nothing to update */
            return;
        }
        new_entity.first_name = pollen_pass_entity.first_name;
        new_entity.last_name = pollen_pass_entity.last_name;
        new_entity.phone_verified = pollen_pass_entity.phone_verified;
        new_entity.country_code = pollen_pass_entity.country_code;
        new_entity.phone_no = pollen_pass_entity.phone_no;
        new_entity.pollen_pass_id = pollen_pass_entity.pollen_pass_id;
    }
}
