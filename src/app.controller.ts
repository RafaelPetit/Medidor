import { Body, Controller, Post } from '@nestjs/common';
import { UploadMeasureDto } from './dto/measure.dto';
import { MeasureService } from './measure/measure.service';

@Controller()
export class AppController {
    constructor(private readonly measureService: MeasureService) {}

    @Post('upload')
    async upload (@Body() uploadMeasureDto: UploadMeasureDto) {
    //    return console.log(uploadMeasureDto.image)
        return await this.measureService.upload(uploadMeasureDto)
    }
}
