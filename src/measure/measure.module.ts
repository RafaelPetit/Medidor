import { forwardRef, Module } from '@nestjs/common';
import { MeasureService } from './measure.service';
import { MeasureRepository } from './repository/measure.repository';
import { MapperModule } from 'src/misc/mapper/mapper.module';
import { GeminiModule } from 'src/gemini/gemini.module';

@Module({
  imports: [MapperModule, GeminiModule],
  providers: [MeasureRepository, MeasureService],
  exports: [MeasureService],
})
export class MeasureModule {}
