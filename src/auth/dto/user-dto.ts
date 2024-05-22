import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class UserDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username : string
   

    @IsNotEmpty()
    email:string
 
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/ , {message :'password is too weak'})
    password : string 

}