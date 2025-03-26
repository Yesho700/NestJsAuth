import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from 'src/Dtos/signup.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from 'src/Dtos/login.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService){}

    async register(signupData: SignupDto){
        // Check Already Exist User
        const user = await this.userService.findUserByEmail(signupData.email);
        if(user)
            return {message: "User Already Existed!!"}

        //Hashing Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(signupData.password, salt);
        const Data = {...signupData, password:hashedPassword}
        return await this.userService.createUser(Data)
    }   


    async generateToken(user: any){
        const payload = {userId:user._id, email:user.email};
        const accessToken = this.jwtService.sign(payload)
        return {accessToken};
    }
    
    async login(credentials: LoginDto)
    {
        //Check weather Email Exist or Not
        const user = await this.userService.findUserByEmail(credentials.email)
        if(!user)
            throw new UnauthorizedException("Invalid Credentials!!!");
        
        //Check weather Password is Correct or Not
        const isValid = await bcrypt.compare(credentials.password, user.password);

        if(!isValid)
            throw new UnauthorizedException("Invalid Credentials");
        return this.generateToken(user);
    }
}
