import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/misc/prisma/prisma.service';
import { Measure, Measure_Type } from '@prisma/client';
import { ConfirmMeasureDto, GetListDto, MeasureDto, ResponseMeasureDto, UploadMeasureDto } from '../../dto/measure.dto';

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

  async findByUuid(uuid: string) : Promise<MeasureDto> {
    return await this.prismaService.measure.findFirst({where: {measure_uuid: uuid}})
  }
  async update(confirmMeasureDto: ConfirmMeasureDto) {
    return await this.prismaService.measure.update({
      where: { measure_uuid: confirmMeasureDto.measure_uuid },
      data: { 
        has_confirmed: true,
        measure_value: confirmMeasureDto.confirmed_value },
    });
  }

  async getList(getListDto: GetListDto) : Promise<MeasureDto[]> {
    return await this.prismaService.measure.findMany({where: getListDto})
  }
}
