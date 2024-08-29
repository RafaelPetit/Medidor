import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {} from './dto/measure.dto';
import { MeasureService } from './measure/measure.service';
import { ApiTags } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { ResponseGetListDto } from './dto/measure-list.dto';
import {
  ResponseUploadMeasureDto,
  UploadMeasureDto,
} from './dto/measure-upload.dto';
import { ConfirmMeasureDto } from './dto/measure-confirm.dto';

@ApiTags('medidor')
@Controller()
export class AppController {
  constructor(private readonly measureService: MeasureService) {}

  @Post('upload')
  async upload(
    @Body() uploadMeasureDto: UploadMeasureDto,
  ): Promise<ResponseUploadMeasureDto> {
    return await this.measureService.upload(uploadMeasureDto);
  }

  @Patch('confirm')
  async confirm(@Body() confirmMeasureDto: ConfirmMeasureDto): Promise<Object> {
    return await this.measureService.confirm(confirmMeasureDto);
  }

  @Get(':customer_code/list')
  async getlist(
    @Param('customer_code') customer_code: string,
    @Query('measure_type') measure_type?: string,
  ): Promise<ResponseGetListDto> {
    return this.measureService.getList(customer_code, measure_type);
  }
}
