import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from 'src/Dtos/signup.dto';
import { LoginDto } from 'src/Dtos/login.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('signup')
    async register(@Body() signupData: SignupDto){
        return await this.authService.register(signupData)
    }

    @Post('login')
    async login(@Body() credentials: LoginDto){
        return await this.authService.login(credentials);
    }


    @UseGuards(AuthGuard)
    @Get('protected')
    async getUser(@Request() req){
        console.log(req.payload.email)
        return await this.authService.getUser(req.payload.email)
    }

}
