// src/middleware/measureValidation.middleware.ts
import {
  Injectable,
  NestMiddleware,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UploadMeasureDto } from 'src/dto/measure.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MeasureValidationMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const uploadMeasureDto: UploadMeasureDto = req.body;

    // Validate Base64 Image
    if (!this.isValidBase64(uploadMeasureDto.image)) {
      throw new BadRequestException({
        error_code: 'INVALID_DATA',
        error_description: 'Invalid base64 image data',
      });
    }

    // Validate Measure Datetime
    if (!this.isValidDate(uploadMeasureDto.measure_datetime)) {
      throw new BadRequestException({
        error_code: 'INVALID_DATA',
        error_description: 'Invalid measure_datetime',
      });
    }

    // Validate Measure Type
    if (
      !['WATER', 'GAS'].includes(uploadMeasureDto.measure_type.toUpperCase())
    ) {
      throw new BadRequestException({
        error_code: 'INVALID_DATA',
        error_description: 'Invalid measure_type. It must be "WATER" or "GAS".',
      });
    }

    // Check for Existing Measures
    if (await this.existingMeasure(uploadMeasureDto)) {
      throw new ConflictException({
        error_code: 'DOUBLE_REPORT',
        error_description: 'Leitura do mês já realizada',
      });
    }

    // Pass the validation, continue to the next middleware/controller
    next();
  }

  private isValidBase64(image: string): boolean {
    try {
      return Buffer.from(image, 'base64').toString('base64') === image;
    } catch (err) {
      return false;
    }
  }

  private isValidDate(dateStr: string): boolean {
    return !isNaN(Date.parse(dateStr));
  }

  private async existingMeasure(
    uploadMeasureDto: UploadMeasureDto,
  ): Promise<boolean> {
    const existingMeasure = await this.prisma.measure.findFirst({
      where: {
        measure_datetime: uploadMeasureDto.measure_datetime,
        measure_type: uploadMeasureDto.measure_type
      },
    });
    return existingMeasure ? true : false;
  }
}
