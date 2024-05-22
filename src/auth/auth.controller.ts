import { Controller, Post } from '@nestjs/common';
import { User } from './auth.entity';
import { AuthService } from './auth.service';
import { Body } from '@nestjs/common';
import { UserDto } from './dto/user-dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService ){}

    @Post('/signup')
     signUp(@Body() userDto: UserDto ): Promise<User>{
     return this.authService.signUp(userDto)
     }

     @Post('/signin')
     signIn(@Body() userDto : UserDto): Promise<string>{
        return this.authService.signIn(userDto)
     }
}
