import { Module } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { MeasurementController } from './measurement.controller';
import { MeasurementRepository } from './repository/measurement.repository';

@Module({
  controllers: [MeasurementController],
  providers: [MeasurementRepository],
  exports: [MeasurementService]
})
export class MeasurementModule {}
