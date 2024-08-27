import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { UserRepository } from './user/repository/user.repository';
import { MeasurementModule } from './measurement/measurement.module';
import { GeminiModule } from './gemini/gemini.module';
import { DeminiService } from './demini/demini.service';
import { ValidatorModule } from './validator/validator.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, MeasurementModule, GeminiModule, ValidatorModule],
  controllers: [UserController],
  providers: [UserRepository, DeminiService],
})
export class AppModule {}
