import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MeasureRepository } from './measure/repository/measure.repository';
import { MeasureModule } from './measure/measure.module';
import { PrismaModule } from './misc/prisma/prisma.module';
import { AppController } from './app.controller';
import { GeminiModule } from './gemini/gemini.module';
import { MapperModule } from './misc/mapper/mapper.module';
import { MeasureUploadValidationMiddleware } from './misc/middleware/measure-upload-validation.middleware';
import { MeasureConfirmValidationMiddleware } from './misc/middleware/measure-confirm-validation';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    GeminiModule,
    MapperModule,
    MeasureModule,
  ],
  controllers: [AppController],
  providers: [MeasureRepository],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MeasureUploadValidationMiddleware).forRoutes('/upload');
    consumer.apply(MeasureConfirmValidationMiddleware).forRoutes('/confirm');
  }
}
