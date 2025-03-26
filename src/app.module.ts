import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [AuthModule, MongooseModule.forRoot("mongodb://localhost:27017/Auth")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
