import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { User } from './auth.entity';
import { AuthService } from './auth.service';
import { Body } from '@nestjs/common';
import { UserDto } from './dto/user-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService ){}

    @Post('/signup')
     signUp(@Body() userDto: UserDto ): Promise<User>{
     return this.authService.signUp(userDto)
     }

     @Post('/signin')
     signIn(@Body() userDto : UserDto): Promise<{accessToken : string}>{
        return this.authService.signIn(userDto)
     }

     @Post('/test') // protected
     @UseGuards(AuthGuard()) // AuthGuard automatically go with the strategy
      test(@Req() req){
         console.log(req.user)
      }
     }
    
