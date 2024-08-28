import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { GeminiService } from 'src/gemini/gemini.service';
import { ResponseMeasureDto, UploadMeasureDto } from '../dto/measure.dto';
import { Measure, } from '@prisma/client';
import { ClassConstructor } from 'class-transformer';
import { MapperService } from 'src/misc/mapper/mapper.service';
import { MeasureRepository } from './repository/measure.repository';

@Injectable()
export class MeasureService {
  private readonly entity: ClassConstructor<Measure>;
  constructor(
    private readonly measureRepository: MeasureRepository,
    private readonly geminiService: GeminiService,
    private readonly mapperService: MapperService,
  ) {}

  async upload(
    uploadMeasureDto: UploadMeasureDto,
  ): Promise<ResponseMeasureDto> {

    const geminiResult = await this.geminiService.analyzeImage(
      uploadMeasureDto.image,
    );

    const PersistMeasure = await this.create(uploadMeasureDto);

    const responseMeasureDto: ResponseMeasureDto = {
      image_url: geminiResult.image_url,
      measure_value: geminiResult.measure_value,
      measure_uuid: PersistMeasure.measure_uuid,
    };

    return responseMeasureDto;
  }

  async create(uploadMeasureDto: UploadMeasureDto) {
    const measureToInstance = this.mapperService.toInstance(
      uploadMeasureDto,
      this.entity,
    );
    return await this.measureRepository.create(measureToInstance);
  }

  async findByMonth(uploadMeasureDto: UploadMeasureDto) {
    return await this.measureRepository.findByMonth(uploadMeasureDto);
  }
}
