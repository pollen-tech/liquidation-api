import { Controller, Get } from '@nestjs/common';
import {ApiBody} from "@nestjs/swagger";

@Controller('index')
export class IndexController {
    @Get()

    hello() {
        return { message: 'Hello, I am index page.' };
    }
}
