import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from './dto/user-dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signUp(userDto: UserDto): Promise<User> {
    const { email, username, password } = userDto;

    // working with the hashing
    const salt = await bcrypt.genSalt();
    console.log('this is the salt : ', salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('this is the hashed password', hashedPassword);
    // const emailExists = await this.userRepository.findOne({ where : {
    //     email : email
    // } })

    // if(emailExists){
    //     throw new ConflictException('Email already Exists')
    // }
    try {
      const user = this.userRepository.create({
        username: username,
        email: email,
        password: hashedPassword,
      });
      const savedUser = await this.userRepository.save(user);
      return savedUser;
    } catch (error) {
      console.log('this is the error by the validation : ', error.code);
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(userDto : UserDto):Promise<string>{
    try {
        const {email , password}= userDto

        const userExit = this.userRepository.findOne({where : {
            email : email
        }})
    
        if (!userExit){
            throw new UnauthorizedException('check credentials!')
        }
    
       const isTrue =  await bcrypt.compare(password , (await userExit).password)
       if(!isTrue){
        throw new UnauthorizedException('Email or password is incorrect!')
       }

      return isTrue  
    } catch (error) {
        console.log('this is the error while signing in : ', error)
    }
    
  }
}
