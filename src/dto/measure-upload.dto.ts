import { ApiProperty } from "@nestjs/swagger";

export class UploadMeasureDto {
  @ApiProperty({ description: 'Base64 encoded image data' })
  image: string;

  @ApiProperty({ description: 'Customer code associated with the measure' })
  customer_code: string;

  @ApiProperty({
    description: 'Date and time of the measurement in ISO format',
  })
  measure_datetime: string;

  @ApiProperty({ description: 'Type of the measure, e.g., WATER or GAS' })
  measure_type: string;
}

export class ResponseUploadMeasureDto {
  @ApiProperty({ description: 'URL of the image associated with the measure' })
  image_url: string;

  @ApiProperty({ description: 'Value of the measurement' })
  measure_value: number;

  @ApiProperty({
    description: 'UUID of the measure, if available',
    required: false,
  })
  measure_uuid?: string;
}