import { Body, Controller, Get, Header, Param, Patch, Post, Query } from '@nestjs/common';
import {
  ConfirmMeasureDto,
  ResponseMeasureDto,
  UploadMeasureDto,
} from './dto/measure.dto';
import { MeasureService } from './measure/measure.service';
import { ApiTags } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly measureService: MeasureService) {}

  @Post('upload')
  async upload(
    @Body() uploadMeasureDto: UploadMeasureDto,
  ): Promise<ResponseMeasureDto> {
    return await this.measureService.upload(uploadMeasureDto);
  }

  @Patch('confirm')
  async confirm(@Body() confirmMeasureDto: ConfirmMeasureDto) {
    return await this.measureService.confirm(confirmMeasureDto);
  }

  @Get(':customer_code/list')
  async getlist(
    @Param('customer_code') customer_code: string,
    @Query('measure_type') measure_type?: string,
  ) {
    return this.measureService.getList(customer_code, measure_type)
  }
}
