import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { GeminiService } from 'src/gemini/gemini.service';
import { MeasurementRepository } from './repository/measure.repository';
import { ResponseMeasureDto, UploadMeasureDto } from './dto/measurement.dto';
import { Measure, Measure_Type } from '@prisma/client';
import { ClassConstructor } from 'class-transformer';
import { MapperService } from 'src/misc/mapper/mapper.service';
import { validatorService } from 'src/misc/validator/validator.service';

@Injectable()
export class MeasurementService {
  private readonly entity: ClassConstructor<Measure>;
  constructor(
    private readonly measurementRepository: MeasurementRepository,
    private readonly geminiService: GeminiService,
    private readonly mapperService: MapperService,
    private readonly validatorService: validatorService,
  ) {}

  async upload(
    uploadMeasureDto: UploadMeasureDto,
  ): Promise<ResponseMeasureDto> {
    await this.validatorService.validateMeasureData(uploadMeasureDto);

    const geminiResult = await this.geminiService.analyzeImage(
      uploadMeasureDto.image,
    );

    const createProduct = await this.create(uploadMeasureDto);

    const responseMeasureDto: ResponseMeasureDto = {
      image_url: geminiResult.image_url,
      measure_value: geminiResult.measure_value,
      measure_uuid: createProduct.measure_uuid,
    };
    
    return responseMeasureDto;
  }

  async create(uploadMeasureDto: UploadMeasureDto) {
    const measureToInstance = this.mapperService.toInstance(
      uploadMeasureDto,
      this.entity,
    );
    return await this.measurementRepository.create(measureToInstance);
  }

  async findByMonth(measure_datetime: string, measure_type: Measure_Type) {
    return await this.findByMonth(measure_datetime, measure_type);
  }
}
