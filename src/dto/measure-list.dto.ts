import { ApiProperty } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";

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

export class ResponseGetListDto {
  customer_code: string;
  measures: {
    measure_uuid: string;

    measure_datetime: Date;

    measure_type: string;

    has_confirmed: boolean;

    image_url: string;
  }[];
}
