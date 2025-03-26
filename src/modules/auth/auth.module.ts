import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/user.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: User.name, schema: UserSchema}]), JwtModule.register({global: true, secret:"HelloSecret@123", signOptions:{expiresIn: '1h'}})],
  providers: [AuthService, UserService],
  controllers: [AuthController]
})
export class AuthModule {}
