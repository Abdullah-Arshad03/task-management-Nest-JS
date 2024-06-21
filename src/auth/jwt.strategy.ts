import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './auth.entity';
import { Repository } from 'typeorm';
import { Payload } from './jwt-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private configService : ConfigService
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // fuction for validating the token
  async validate(payload: Payload): Promise<User> {
    const { email } = payload;

    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!user) {
    throw new UnauthorizedException('error in the strategy')
    }
    console.log('this is the user from db in the validate : ', user)
    return user;
  }
}
