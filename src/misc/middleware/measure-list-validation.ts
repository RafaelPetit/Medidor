// src/middleware/measureValidation.middleware.ts
import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MeasureListValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { measure_type } = req.query;

    if (
      measure_type &&
      !['WATER', 'GAS'].includes(String(measure_type).toUpperCase())
    ) {
      throw new BadRequestException({
        error_code: 'INVALID_TYPE',
        error_description: 'Tipo de medição não permitida',
      });
    }


    next();
  }
}
