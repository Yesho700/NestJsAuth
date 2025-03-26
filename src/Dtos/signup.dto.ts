import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignupDto{

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @MinLength(8)
    password: string;
}