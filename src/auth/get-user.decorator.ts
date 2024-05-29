import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./auth.entity";
// import { User } from "./auth.entity";


export const GetUser = createParamDecorator((_data , ctx:ExecutionContext): User =>{
    console.log('this is the ctx : ',ctx)
    const req  = ctx.switchToHttp().getRequest()
    console.log('this is the user : ', req.user)
    return req.user
})