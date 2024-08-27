import { Module } from "@nestjs/common";
import { MeasurementModule } from "src/measurement/measurement.module";
import { validatorService } from "./validator.service";

@Module({
    imports: [MeasurementModule],
    exports: [validatorService],
})