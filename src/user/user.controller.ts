import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/entities/user.entity';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post('/register')
    register(@Body() createUserDto: CreateUserDto){
        return this.userService.register(createUserDto);
    }

    @Post('/login')
    login(@Body('username') username: string, @Body('password') password: string) {
        return this.userService.login(username, password);
    }
}
