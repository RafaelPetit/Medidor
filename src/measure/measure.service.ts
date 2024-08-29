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
  CreateMeasureDto,
  MeasureDto,
} from '../dto/measure.dto';
import { $Enums, Measure } from '@prisma/client';
import { ClassConstructor } from 'class-transformer';
import { MapperService } from 'src/misc/mapper/mapper.service';
import { MeasureRepository } from './repository/measure.repository';
import { throwError } from 'rxjs';
import { STATUS_CODES } from 'http';
import { GetListDto, ResponseGetListDto } from 'src/dto/measure-list.dto';
import { ResponseUploadMeasureDto, UploadMeasureDto } from 'src/dto/measure-upload.dto';
import { ConfirmMeasureDto } from 'src/dto/measure-confirm.dto';

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
  ): Promise<ResponseUploadMeasureDto> {
    const geminiResponse = await this.geminiService.analyzeImage(
      uploadMeasureDto.image,
    );

    const createMeasureDto: CreateMeasureDto = {
      customer_code: uploadMeasureDto.customer_code,
      measure_datetime: uploadMeasureDto.measure_datetime,
      measure_type:
        uploadMeasureDto.measure_type.toUpperCase() as $Enums.Measure_Type,
      measure_value: geminiResponse.measure_value,
      image_url: geminiResponse.image_url,
    };

    const persistMeasure = await this.create(createMeasureDto);

    const responseMeasureDto: ResponseUploadMeasureDto = {
      image_url: geminiResponse.image_url,
      measure_value: geminiResponse.measure_value,
      measure_uuid: persistMeasure.measure_uuid,
    };

    return responseMeasureDto;
  }

  async create(
    createMeasureDto: CreateMeasureDto,
  ): Promise<ResponseUploadMeasureDto> {
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

  async confirm(confirmMeasureDto: ConfirmMeasureDto): Promise<object> {
    const confirmedMeasure =
      await this.measureRepository.update(confirmMeasureDto);
    return {
      sucess: confirmedMeasure.has_confirmed,
    };
  }

  async getList(
    customer_code: string,
    measure_type?: string,
  ): Promise<ResponseGetListDto> {
    const getListDto: GetListDto = measure_type
      ? {
          customer_code,
          measure_type: measure_type.toUpperCase() as $Enums.Measure_Type,
        }
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

  async formatMeasuresResponse(
    measures: MeasureDto[],
  ): Promise<ResponseGetListDto> {
    const groupedMeasures = measures.reduce(
      (acc, measure) => {
        const responseGetListDto = {
          measure_uuid: measure.measure_uuid,
          measure_datetime: measure.measure_datetime,
          measure_type: measure.measure_type,
          has_confirmed: measure.has_confirmed,
          image_url: measure.image_url,
        };

        if (!acc.customer_code) {
          acc.customer_code = measure.customer_code;
        }

        acc.measures.push(responseGetListDto);
        return acc;
      },
      { customer_code: '', measures: [] } as ResponseGetListDto,
    );
    return groupedMeasures;
  }
}
