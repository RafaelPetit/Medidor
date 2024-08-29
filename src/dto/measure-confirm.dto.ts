import { ApiProperty } from "@nestjs/swagger";

export class ConfirmMeasureDto {
  @ApiProperty({ description: 'UUID of the measure to confirm' })
  measure_uuid: string;

  @ApiProperty({ description: 'Confirmed value of the measure' })
  confirmed_value: number;
}
