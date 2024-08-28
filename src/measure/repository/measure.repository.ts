import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/misc/prisma/prisma.service';
import { Measure, Measure_Type } from '@prisma/client';
import { ResponseMeasureDto, UploadMeasureDto } from '../../dto/measure.dto';

@Injectable()
export class MeasureRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(measure: Measure): Promise<ResponseMeasureDto> {
    return await this.prismaService.measure.create({ data: measure });
  }

  async findByMonth(
    uploadMeasureDto: UploadMeasureDto
  ): Promise<boolean> {
    return await this.prismaService.measure.findFirst({
      where: {
        measure_datetime: uploadMeasureDto.measure_datetime,
        measure_type: uploadMeasureDto.measure_type,
      },
    })
      ? true
      : false;
  }
}
