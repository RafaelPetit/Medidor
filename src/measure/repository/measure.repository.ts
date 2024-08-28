import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/misc/prisma/prisma.service';
import { Measure, Measure_Type } from '@prisma/client';
import { ResponseMeasureDto } from '../dto/measurement.dto';

@Injectable()
export class MeasurementRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(measure: Measure) : Promise<ResponseMeasureDto>{
    return await this.prismaService.measure.create({ data: measure });
  }

  async findByMonth(measure_datetime: string, measure_type: Measure_Type) : Promise<boolean>{
    return await this.prismaService.measure.findFirst({
      where: {
        measure_datetime,
        measure_type,
      },
    }) ? true :  false
  }
}
