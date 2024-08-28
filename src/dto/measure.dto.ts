import { Measure_Type } from "@prisma/client";
import { IsBase64, IsDateString, IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";

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

  measure_value: number;

  image_url: string;
}

export class ConfirmMeasureDto {
  @IsString({ message: 'measureUuid must be a string' })
  @IsNotEmpty({ message: 'measureUuid must not be empty ' })
  measure_uuid: string;

  @IsInt({ message: 'confirmedValue must be a int' })
  @IsNotEmpty({ message: 'confirmedValue must not be empty ' })
  confirmed_value: number;
}

export class ResponseMeasureDto {
  image_url: string
  measure_value: number
  measure_uuid?: string
}