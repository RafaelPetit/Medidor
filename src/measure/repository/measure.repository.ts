import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/misc/prisma/prisma.service';
import { $Enums, Measure } from '@prisma/client';
import {
  MeasureDto,
} from '../../dto/measure.dto';
import { GetListDto } from 'src/dto/measure-list.dto';
import { ResponseUploadMeasureDto, UploadMeasureDto } from 'src/dto/measure-upload.dto';
import { ConfirmMeasureDto } from 'src/dto/measure-confirm.dto';

@Injectable()
export class MeasureRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(measure: Measure): Promise<ResponseUploadMeasureDto> {
    return await this.prismaService.measure.create({ data: measure });
  }

  async findByMonth(uploadMeasureDto: UploadMeasureDto): Promise<boolean> {
    return (await this.prismaService.measure.findFirst({
      where: {
        measure_datetime: uploadMeasureDto.measure_datetime,
        measure_type:
          uploadMeasureDto.measure_type.toLocaleUpperCase() as $Enums.Measure_Type,
      },
    }))
      ? true
      : false;
  }

  async findByUuid(uuid: string): Promise<MeasureDto> {
    return await this.prismaService.measure.findFirst({
      where: { measure_uuid: uuid },
    });
  }
  async update(confirmMeasureDto: ConfirmMeasureDto) {
    return await this.prismaService.measure.update({
      where: { measure_uuid: confirmMeasureDto.measure_uuid },
      data: {
        has_confirmed: true,
        measure_value: confirmMeasureDto.confirmed_value,
      },
    });
  }

  async getList(getListDto: GetListDto): Promise<MeasureDto[]> {
    return await this.prismaService.measure.findMany({ where: getListDto });
  }
}
