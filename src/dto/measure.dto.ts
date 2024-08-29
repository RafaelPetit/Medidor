import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Measure_Type } from '@prisma/client';


export class MeasureDto {
  @ApiProperty({ description: 'Unique identifier of the measure' })
  id: number;

  @ApiProperty({ description: 'UUID of the measure' })
  measure_uuid: string;

  @ApiProperty({ description: 'Customer code associated with the measure' })
  customer_code: string;

  @ApiProperty({ description: 'Date and time of the measurement' })
  measure_datetime: Date;

  @ApiProperty({
    enum: $Enums.Measure_Type,
    description: 'Type of the measure',
  })
  measure_type: $Enums.Measure_Type;

  @ApiProperty({ description: 'Value of the measurement' })
  measure_value: number;

  @ApiProperty({ description: 'Indicates if the measure has been confirmed' })
  has_confirmed: boolean;

  @ApiProperty({ description: 'URL of the image associated with the measure' })
  image_url: string;
}

export class CreateMeasureDto {
  @ApiProperty({ description: 'Customer code associated with the measure' })
  customer_code: string;

  @ApiProperty({
    description: 'Date and time of the measurement in ISO format',
  })
  measure_datetime: string;

  @ApiProperty({
    enum: $Enums.Measure_Type,
    description: 'Type of the measure, e.g., WATER or GAS',
  })
  measure_type: $Enums.Measure_Type;

  @ApiProperty({ description: 'Value of the measurement' })
  measure_value: number;

  @ApiProperty({ description: 'URL of the image associated with the measure' })
  image_url: string;
}







