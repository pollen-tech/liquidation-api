import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';
import { UserService } from '../domain/user.service';
import { NewUsersDto, UserDtoRes } from '../dto/users.dto';
import { EmailNotificationService } from '../../notify/domain/email.notification.service';

@ApiTags('Users')
@Controller('users')
@Public()
export class UserController {
    constructor(
        private readonly userService: UserService,
        private emailNotificationService: EmailNotificationService,
    ) {}

    @Get('/index')
    async helloIndex() {
        return { value: 'Hello Index' };
    }

    @Get(':user_id')
    async findByUserId(@Param('user_id') user_id: string) {
        let data = await this.userService.findOneById(user_id);
        return this.createUserDto(data);
    }

    @Post()
    async createUser(@Body() requestDTO: NewUsersDto) {
        let data = await this.userService.createIfNotExistByEmailAndChannel(requestDTO);
        return this.createUserDto(data);
    }

    @Get('/pollen-pass-by-user-id/:user_id')
    @HttpCode(HttpStatus.OK)
    async getPollenPassByParameters(@Param('user_id') user_id?: string) {
        const data = await this.userService.findPollenPassOneByUserId(user_id, null);
        return this.createUserDto(data);
    }

    @Get('/pollen-pass-by-email/:email')
    @HttpCode(HttpStatus.OK)
    async getPollenPassByEmailId(@Param('email') email: string) {
        const data = await this.userService.findPollenPassOneByUserId(null, email);
        return this.createUserDto(data);
    }

    @Get('/channel/:user_id')
    @HttpCode(HttpStatus.OK)
    async findAllChannelsByUserId(@Param('user_id') user_id: string) {
        let data = await this.userService.findAllForChannel(user_id);
        return this.createUserDto(data);
    }

    @Post('/:user_id/welcome-email')
    @HttpCode(HttpStatus.OK)
    async sendWelcome(@Param('user_id') user_id: string) {
        let data = await this.userService.sendEmailNotification(user_id);
        return this.createUserDto(data);
    }

    private createUserDto(data: NewUsersDto | any) {
        if (!data || data.length === 0) {
            let dto = new UserDtoRes().setDto(data);
            dto.desc = 'User does not exist';
            dto.status_code = 'USER_NOT_EXIST';
            return dto;
        } else {
            return new UserDtoRes().setDto(data);
        }
    }
}
