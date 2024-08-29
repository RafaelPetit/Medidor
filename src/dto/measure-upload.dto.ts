import { ApiProperty } from '@nestjs/swagger';

export class UploadMeasureDto {
  @ApiProperty({
    description: 'Dados da imagem codificados em Base64',
    example:
      'iVBORw0KGgoAAAANSUhEUgAAAf0AAADGCAMAAADv2KlgAAAAAXNSR0IArs4c6QAAALFQTFRF....',
  })
  image: string;

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
    description: 'Tipo da medição, por exemplo, WATER ou GAS',
    example: 'WATER',
  })
  measure_type: string;
}

export class ResponseUploadMeasureDto {
  @ApiProperty({
    description: 'URL da imagem associada à medição',
    example: 'https://i.imgur.com/jJ5mE8B.jpg',
  })
  image_url: string;

  @ApiProperty({ description: 'Valor da medição', example: 101.50 })
  measure_value: number;

  @ApiProperty({
    description: 'UUID da medição, se disponível',
    required: false,
    example: '7c37cce3-c79a-4822-9be7-781b0bb0e986',
  })
  measure_uuid?: string;
}
