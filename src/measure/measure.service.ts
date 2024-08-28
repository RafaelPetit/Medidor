import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { GeminiService } from 'src/gemini/gemini.service';
import { CreateMeasureDto, ResponseMeasureDto, UploadMeasureDto } from '../dto/measure.dto';
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

    const geminiResponse = await this.geminiService.analyzeImage(uploadMeasureDto.image);

    const createMeasureDto: CreateMeasureDto = {
      ...uploadMeasureDto,
      measure_value: geminiResponse.measure_value,
      image_url: geminiResponse.image_url,
    };

    console.log('create measure dto -> '+ createMeasureDto)
    console.log('germini response -> ' + geminiResponse) 
    
    const persistMeasure = await this.create(createMeasureDto);

    const responseMeasureDto: ResponseMeasureDto = {
      image_url: geminiResponse.image_url,
      measure_value: geminiResponse.measure_value,
      measure_uuid: persistMeasure.measure_uuid,
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
