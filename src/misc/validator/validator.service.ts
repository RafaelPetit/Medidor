import { BadRequestException, ConflictException } from '@nestjs/common';
import { UploadMeasureDto } from 'src/measure/dto/measurement.dto';
import { MeasurementService } from 'src/measure/measure.service';

export class validatorService {
  constructor(private readonly measurementService: MeasurementService) {}

  async validateMeasureData(uploadMeasureDto: UploadMeasureDto) {
    if (!this.isValidBase64(uploadMeasureDto.image)) {
      throw new BadRequestException({
        error_code: 'INVALID_DATA',
        error_description: 'Invalid base64 image data',
      });
    }

    if (!this.isValidDate(uploadMeasureDto.measure_datetime)) {
      throw new BadRequestException({
        error_code: 'INVALID_DATA',
        error_description: 'Invalid measure_datetime',
      });
    }

    if (
      !['WATER', 'GAS'].includes(uploadMeasureDto.measure_type.toUpperCase())
    ) {
      throw new BadRequestException({
        error_code: 'INVALID_DATA',
        error_description: 'Invalid measure_type. It must be "WATER" or "GAS".',
      });
    }

    if (this.existingMeasure(uploadMeasureDto)) {
      throw new ConflictException({
        error_code: 'DOUBLE_REPORT',
        error_description: 'Leitura do mês já realizada',
      });
    }
  }

  async existingMeasure(uploadMeasureDto: UploadMeasureDto): Promise<boolean> {
    return await this.measurementService.findByMonth(
      uploadMeasureDto.measure_datetime,
      uploadMeasureDto.measure_type,
    );
  }

  async isValidBase64(str: string): Promise<boolean> {
    try {
      return Buffer.from(str, 'base64').toString('base64') === str;
    } catch (err) {
      return false;
    }
  }

  async isValidDate(dateStr: string): Promise<boolean> {
    return !isNaN(Date.parse(dateStr));
  }
}
