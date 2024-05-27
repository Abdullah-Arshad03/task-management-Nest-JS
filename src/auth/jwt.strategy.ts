import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './auth.entity';
import { Repository } from 'typeorm';
import { Payload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super({
      secretOrKey: 'somesupersecret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      
    });
  }

  // fuction for validating the token
  async validate(payload: Payload): Promise<User> {
    const { email } = payload;
console.log('in the validate - 1 ')
    const user = this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) {
console.log('in the validate - 2 ( if user not there ) ')

    throw new UnauthorizedException('error in the strategy')
    }
console.log('in the validate - 3 ( got user )')

    return user;
  }
}
