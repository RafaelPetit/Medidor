import { HttpCode } from '@nestjs/common';
import { $Enums, Measure_Type } from '@prisma/client';
import {
  IsBase64,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class UploadMeasureDto {
  @IsString({ message: 'image must be a string' })
  @IsNotEmpty({ message: 'image must not be empty ' })
  @IsBase64()
  image: string;

  @IsString({ message: 'customerCode must be a string' })
  @IsNotEmpty({ message: 'customerCode must not be empty ' })
  customer_code: string;

  @IsDateString()
  @IsNotEmpty({ message: 'measurementDatetime must not be empty ' })
  measure_datetime: string;

  @IsEnum(Measure_Type)
  @IsNotEmpty({ message: 'measurementType must not be empty ' })
  measure_type: Measure_Type;
}

export class CreateMeasureDto {
  @IsString({ message: 'customerCode must be a string' })
  @IsNotEmpty({ message: 'customerCode must not be empty ' })
  customer_code: string;

  @IsDateString()
  @IsNotEmpty({ message: 'measurementDatetime must not be empty ' })
  measure_datetime: string;

  @IsEnum(Measure_Type)
  @IsNotEmpty({ message: 'measurementType must not be empty ' })
  measure_type: Measure_Type;

  measure_value: number;

  image_url: string;
}

export class ConfirmMeasureDto {
  @IsString({ message: 'measure_uuid must be a string' })
  @IsNotEmpty({ message: 'measure_uuid must not be empty ' })
  measure_uuid: string;

  @IsInt({ message: 'confirmedValue must be a int'})
  @IsNumber({ maxDecimalPlaces:2, allowInfinity: false, allowNaN: false})
  @IsNotEmpty({ message: 'confirmedValue must not be empty ' })
  confirmed_value: number;
}

export class MeasureDto {
  id: number;
  measure_uuid: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: $Enums.Measure_Type;
  measure_value: number;
  has_confirmed: boolean;
  image_url: string;
}

export class ResponseMeasureDto {
  image_url: string;
  measure_value: number;
  measure_uuid?: string;
}

export class GetListDto {
  customer_code: string
  measure_type?: $Enums.Measure_Type
}

export class ResponseGetListDto {
  measure_uuid : string
  measure_datetime : Date
  measure_type : string
  has_confirmed :boolean
  image_url: string
}
