import { ApiProperty } from '@nestjs/swagger';
import { $Enums, } from '@prisma/client';


export class MeasureDto {
  @ApiProperty({ description: 'Identificador único da medição', example: 1 })
  id: number;

  @ApiProperty({
    description: 'UUID da medição',
    example: '7c37cce3-c79a-4822-9be7-781b0bb0e986',
  })
  measure_uuid: string;

  @ApiProperty({
    description: 'Código do cliente associado à medição',
    example: 'cliente123',
  })
  customer_code: string;

  @ApiProperty({
    description: 'Data e hora da medição',
    example: '2024-08-29T00:00:00Z',
  })
  measure_datetime: Date;

  @ApiProperty({
    enum: $Enums.Measure_Type,
    description: 'Tipo da medição',
    example: 'WATER',
  })
  measure_type: $Enums.Measure_Type;

  @ApiProperty({ description: 'Valor da medição', example: 100.5 })
  measure_value: number;

  @ApiProperty({
    description: 'Indica se a medição foi confirmada',
    example: true,
  })
  has_confirmed: boolean;

  @ApiProperty({
    description: 'URL da imagem associada à medição',
    example: 'https://i.imgur.com/jJ5mE8B.jpg',
  })
  image_url: string;
}

export class CreateMeasureDto {
  @ApiProperty({
    description: 'Código do cliente associado à medição',
    example: 'cliente123',
  })
  customer_code: string;

  @ApiProperty({
    description: 'Data e hora da medição no formato ISO',
    example: '2024-08-29T00:00:00Z',
  })
  measure_datetime: string;

  @ApiProperty({
    enum: $Enums.Measure_Type,
    description: 'Tipo da medição, por exemplo, WATER ou GAS',
    example: 'WATER',
  })
  measure_type: $Enums.Measure_Type;

  @ApiProperty({ description: 'Valor da medição', example: 100.5 })
  measure_value: number;

  @ApiProperty({
    description: 'URL da imagem associada à medição',
    example: 'https://i.imgur.com/jJ5mE8B.jpg',
  })
  image_url: string;
}
