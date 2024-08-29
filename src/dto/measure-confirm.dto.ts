import { ApiProperty } from "@nestjs/swagger";

export class ConfirmMeasureDto {
  @ApiProperty({
    description: 'UUID da medição a ser confirmada',
    example: '7c37cce3-c79a-4822-9be7-781b0bb0e986',
  })
  measure_uuid: string;

  @ApiProperty({ description: 'Valor confirmado da medição', example: 100.5 })
  confirmed_value: number;
}
