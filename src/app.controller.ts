import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {} from './dto/measure.dto';
import { MeasureService } from './measure/measure.service';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseGetListDto } from './dto/measure-list.dto';
import {
  ResponseUploadMeasureDto,
  UploadMeasureDto,
} from './dto/measure-upload.dto';
import { ConfirmMeasureDto } from './dto/measure-confirm.dto';

@ApiTags('medidor')
@Controller()
export class AppController {
  constructor(private readonly measureService: MeasureService) {}

  @Post('upload')
  @ApiResponse({
    status: 200,
    description: 'Operação realizada com sucesso',
    type: ResponseUploadMeasureDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Os dados fornecidos no corpo da requisição são inválidos',
    schema: {
      example: {
        error_code: 'INVALID_DATA',
        error_description: 'Descrição do erro',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Já existe uma leitura para este tipo no mês atual',
    schema: {
      example: {
        error_code: 'DOUBLE_REPORT',
        error_description: 'Leitura do mês já realizada',
      },
    },
  })
  async upload(
    @Body() uploadMeasureDto: UploadMeasureDto,
  ): Promise<ResponseUploadMeasureDto> {
    return await this.measureService.upload(uploadMeasureDto);
  }

  @Patch('confirm')
  @ApiResponse({
    status: 200,
    description: 'Operação realizada com sucesso',
    schema: {
      example: {
        success: true,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Os dados fornecidos no corpo da requisição são inválidos',
    schema: {
      example: {
        error_code: 'INVALID_DATA',
        error_description: 'Descrição do erro',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Leitura não encontrada',
    schema: {
      example: {
        error_code: 'MEASURE_NOT_FOUND',
        error_description: 'Leitura do mês já realizada',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Leitura já confirmada',
    schema: {
      example: {
        error_code: 'CONFIRMATION_DUPLICATE',
        error_description: 'Leitura do mês já realizada',
      },
    },
  })
  async confirm(@Body() confirmMeasureDto: ConfirmMeasureDto): Promise<object> {
    return await this.measureService.confirm(confirmMeasureDto);
  }

  @Get(':customer_code/list')
  @ApiResponse({
    status: 200,
    description: 'Operação realizada com sucesso',
    type: ResponseGetListDto
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetro measure type diferente de WATER ou GAS',
    schema: {
      example: {
        error_code: 'INVALID_TYPE',
        error_description: 'Tipo de medição não permitida',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum registro encontrado',
    schema: {
      example: {
        error_code: 'MEASURES_NOT_FOUND',
        error_description: 'Nenhuma leitura encontrada',
      },
    },
  })
  @ApiParam({
    name: 'customer_code',
    description: 'Código do cliente para filtrar as medidas',
    type: String,
  })
  @ApiQuery({
    name: 'measure_type',
    description: 'Tipo da medida (WATER ou GAS)',
    required: false,
    enum: ['WATER', 'GAS'],
    example: 'WATER',
  })
  async getlist(
    @Param('customer_code') customer_code: string,
    @Query('measure_type') measure_type?: string,
  ): Promise<ResponseGetListDto> {
    return this.measureService.getList(customer_code, measure_type);
  }
}
