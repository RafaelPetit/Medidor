import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GeminiService } from 'src/gemini/gemini.service';
import {
  ConfirmMeasureDto,
  CreateMeasureDto,
  GetListDto,
  MeasureDto,
  ResponseGetListDto,
  ResponseMeasureDto,
  UploadMeasureDto,
} from '../dto/measure.dto';
import { $Enums, Measure } from '@prisma/client';
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
    const confirmedMeasure =
      await this.measureRepository.update(confirmMeasureDto);
    return {
      sucess: confirmedMeasure.has_confirmed,
    };
  }

  async getList(customer_code: string, measure_type?: string): Promise<any> {

    if (!measure_type || !['WATER', 'GAS'].includes(measure_type.toUpperCase())) {
      throw new BadRequestException({
        error_code: 'INVALID_TYPE',
        error_description: 'Tipo de medição não permitida',
      });
    }

    const getListDto: GetListDto = measure_type
      ? { customer_code, measure_type: measure_type as $Enums.Measure_Type }
      : { customer_code };

    const responseGetList = await this.measureRepository.getList(getListDto);

    const formattedResponse =
      await this.formatMeasuresResponse(responseGetList);

    if (responseGetList.length === 0) {
      throw new NotFoundException({
        error_code: 'MEASURES_NOT_FOUND',
        error_description: 'Nenhuma leitura encontrada',
      });
    }

    return formattedResponse;
  }

  async formatMeasuresResponse(measures: MeasureDto[]) {
    const groupedMeasures = measures.reduce((acc, measure) => {
      const responseGetListDto: ResponseGetListDto = {
        measure_uuid: measure.measure_uuid,
        measure_datetime: measure.measure_datetime,
        measure_type: measure.measure_type,
        has_confirmed: measure.has_confirmed,
        image_url: measure.image_url,
      };

      if (!acc[measure.customer_code]) {
        acc[measure.customer_code] = {
          customer_code: measure.customer_code,
          measures: [],
        };
      }

      acc[measure.customer_code].measures.push(responseGetListDto);

      return acc;
    }, {});

    return Object.values(groupedMeasures);
  }
}
