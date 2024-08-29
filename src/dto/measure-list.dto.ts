import { ApiProperty } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";

export class GetListDto {
  @ApiProperty({ description: 'Customer code for fetching the measures' })
  customer_code: string;

  @ApiProperty({
    enum: $Enums.Measure_Type,
    description: 'Optional type of the measure to filter by',
    required: false,
  })
  measure_type?: $Enums.Measure_Type;
}

export interface ResponseGetListDto {
  customer_code: string;
  measures: {
    measure_uuid: string;

    measure_datetime: Date;

    measure_type: string;

    has_confirmed: boolean;

    image_url: string;
  }[];
}
