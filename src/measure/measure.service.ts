import { Injectable, BadRequestException, NotFoundException, ConflictException, HttpCode, HttpStatus } from '@nestjs/common';
import { GeminiService } from 'src/gemini/gemini.service';
import {
  ConfirmMeasureDto,
  CreateMeasureDto,
  MeasureDto,
  ResponseMeasureDto,
  UploadMeasureDto,
} from '../dto/measure.dto';
import { Measure } from '@prisma/client';
import { ClassConstructor } from 'class-transformer';
import { MapperService } from 'src/misc/mapper/mapper.service';
import { MeasureRepository } from './repository/measure.repository';
import { throwError } from 'rxjs';
import { STATUS_CODES } from 'http';

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
    const geminiResponse = await this.geminiService.analyzeImage(
      uploadMeasureDto.image,
    );

    const createMeasureDto: CreateMeasureDto = {
      customer_code: uploadMeasureDto.customer_code,
      measure_datetime: uploadMeasureDto.measure_datetime,
      measure_type: uploadMeasureDto.measure_type,
      measure_value: geminiResponse.measure_value,
      image_url: geminiResponse.image_url,
    };

    const persistMeasure = await this.create(createMeasureDto);

    const responseMeasureDto: ResponseMeasureDto = {
      image_url: geminiResponse.image_url,
      measure_value: geminiResponse.measure_value,
      measure_uuid: persistMeasure.measure_uuid,
    };

    return responseMeasureDto;
  }

  async create(
    createMeasureDto: CreateMeasureDto,
  ): Promise<ResponseMeasureDto> {
    const measureToInstance = this.mapperService.toInstance(
      createMeasureDto,
      this.entity,
    );
    return await this.measureRepository.create(measureToInstance);
  }

  async findByMonth(uploadMeasureDto: UploadMeasureDto): Promise<boolean> {
    return await this.measureRepository.findByMonth(uploadMeasureDto);
  }

  async findByUuid(uuid: string): Promise<MeasureDto> {
    return await this.measureRepository.findByUuid(uuid);
  }

  async confirm(confirmMeasureDto: ConfirmMeasureDto) {
      const confirmedMeasure = await this.measureRepository.update(confirmMeasureDto)
       return {
         sucess: confirmedMeasure.has_confirmed,
       };
}
}
