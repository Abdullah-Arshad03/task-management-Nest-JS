import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user-dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './auth.entity';

@Injectable()
export class AuthService {

   
    constructor(  @InjectRepository(User)  private userRepository:Repository<User>) {}


   async createUser(userDto: UserDto): Promise<User>{
        const {email , username}= userDto
      const user =   this.userRepository.create({
            username : username ,
            email : email
        })
       const savedUser = await this.userRepository.save(user)

        return savedUser

    }
}
