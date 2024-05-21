import { Controller, Post } from '@nestjs/common';
import { User } from './auth.entity';
import { AuthService } from './auth.service';
import { Body } from '@nestjs/common';
import { UserDto } from './dto/user-dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService ){}

    @Post()
     createrUser(@Body() userDto: UserDto ): Promise<User>{
     return this.authService.createUser(userDto)
     }
}
