import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

export class GetListDto {
  @ApiProperty({
    description: 'Código do cliente para buscar as medições',
    example: 'cliente123',
  })
  customer_code: string;

  @ApiProperty({
    enum: $Enums.Measure_Type,
    description: 'Tipo opcional da medição para filtrar',
    required: false,
    example: 'WATER',
  })
  measure_type?: $Enums.Measure_Type;
}

export class MeasureItemDto {
  @ApiProperty({
    description: 'UUID da medição',
    example: '7c37cce3-c79a-4822-9be7-781b0bb0e986',
  })
  measure_uuid: string;

  @ApiProperty({
    description: 'Data e hora da medição',
    example: '2024-08-29T00:00:00Z',
  })
  measure_datetime: Date;

  @ApiProperty({ description: 'Tipo da medição', example: 'WATER' })
  measure_type: string;

  @ApiProperty({
    description: 'Indica se a medição foi confirmada',
    example: true,
  })
  has_confirmed: boolean;

  @ApiProperty({
    description: 'URL da imagem associada à medição',
    example: 'https://example.com/image.jpg',
  })
  image_url: string;
}

export class ResponseGetListDto {
  @ApiProperty({ description: 'Código do cliente', example: 'cliente123' })
  customer_code: string;

  @ApiProperty({
    description: 'Lista de medições realizadas',
    type: [MeasureItemDto],
  })
  measures: MeasureItemDto[];
}
