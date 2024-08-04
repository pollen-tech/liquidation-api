import { Controller, Get } from '@nestjs/common';

@Controller('index')
export class IndexController {
    @Get()
    hello() {
        return { message: 'Hello, I am index page.' };
    }
}
