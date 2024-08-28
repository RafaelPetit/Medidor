import { Body, Controller, Patch, Post } from '@nestjs/common';
import {
  ConfirmMeasureDto,
  ResponseMeasureDto,
  UploadMeasureDto,
} from './dto/measure.dto';
import { MeasureService } from './measure/measure.service';
import { ApiTags } from '@nestjs/swagger';

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
}
