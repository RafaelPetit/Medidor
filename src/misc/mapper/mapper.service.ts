import { Injectable } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ResponseGetListDto } from 'src/dto/measure-list.dto';
import { MeasureDto } from 'src/dto/measure.dto';

@Injectable()
export class MapperService {
  toInstance<V, T>(dto: V, classConstructor: ClassConstructor<T>): T {
    return plainToInstance(classConstructor, dto, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }

  toInstanceList<V, T>(
    dtoList: V[],
    classConstructor: ClassConstructor<T>,
  ): T[] {
    return dtoList.map((dto) =>
      plainToInstance(classConstructor, dto, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      }),
    );
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
