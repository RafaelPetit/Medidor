import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { MeasurementService } from './measure.service';
import { UploadMeasureDto } from './dto/measurement.dto';

@Controller('measurement')
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  @Post('upload')
  async create(@Body() uploadMeasureDto: UploadMeasureDto) {
    return await this.measurementService.upload(uploadMeasureDto);
  }

  // @Patch('confirm')
  // async confirmMeasurement(@Body() confirmMeasurementDto: ConfirmMeasurementDto) {
  //   return this.measurementService.confirmMeasurement(confirmMeasurementDto)
  // }

  // @Get()
  // findAll() {
  //   return this.measurementService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.measurementService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateMeasurementDto: UpdateMeasurementDto,
  // ) {
  //   return this.measurementService.update(+id, updateMeasurementDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.measurementService.remove(+id);
  // }
}
