import { Module } from '@nestjs/common';
import { MeasurementService } from './measure.service';
import { MeasurementController } from './measure.controller';
import { MeasurementRepository } from './repository/measure.repository';
import { MapperModule } from 'src/misc/mapper/mapper.module';
import { GeminiModule } from 'src/gemini/gemini.module';
import { ValidatorModule } from 'src/misc/validator/validator.module';

@Module({
  controllers: [MeasurementController],
  providers: [MeasurementRepository],
  exports: [MeasurementService],
  imports: [MapperModule, ValidatorModule, GeminiModule]
})
export class MeasurementModule {}
