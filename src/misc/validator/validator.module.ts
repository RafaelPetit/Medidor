import { Module } from "@nestjs/common";
import { MeasurementModule } from "src/measure/measure.module";
import { validatorService } from "./validator.service";

@Module({
  imports: [MeasurementModule],
  exports: [validatorService],
})
export class ValidatorModule {}