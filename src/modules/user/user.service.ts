import { Injectable } from '@nestjs/common';
import { User, UserDocument } from 'src/models/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SignupDto } from 'src/Dtos/signup.dto';


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async createUser(signupData: SignupDto){
        return await this.userModel.create(signupData);
    }

    async findUserByEmail(email: string){
        return await this.userModel.findOne({email});
    }
}
