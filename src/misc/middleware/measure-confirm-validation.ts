// src/middleware/measureValidation.middleware.ts
import { Injectable, NestMiddleware, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { ConfirmMeasureDto } from 'src/dto/measure-confirm.dto';

@Injectable()
export class MeasureConfirmValidationMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const confirmMeasureDto: ConfirmMeasureDto = req.body;

    if (!isUUID(confirmMeasureDto.measure_uuid)) {
      throw new BadRequestException({
        error_code: 'INVALID_DATA',
        error_description: 'UUID fornecido não é valido.',
      });
    }

    if (!Number(confirmMeasureDto.confirmed_value)) {
      throw new BadRequestException({
        error_code: 'INVALID_DATA',
        error_description: 'confirmed_value fornecido não é valido.',
      });
    }

    const findedMeasure = await this.prisma.measure.findFirst({
      where: { measure_uuid: confirmMeasureDto.measure_uuid },
    });

    if (!findedMeasure) {
      throw new NotFoundException({
        error_code: 'MEASURE_NOT_FOUND',
        error_description: 'Leitura do mês não encontrada',
      });
    }

    if (findedMeasure.has_confirmed === true) {
      throw new ConflictException({
        error_code: 'CONFIRMATION_DUPLICATE',
        error_description: 'Leitura do mês já realizada',
      });
    }

    next();
  }
}
