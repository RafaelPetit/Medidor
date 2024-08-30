import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/misc/prisma/prisma.service';
import { mockPrismaService } from './prisma.service.mock'; // Importe o mock
import { MeasureRepository } from 'src/measure/repository/measure.repository';
import { CreateMeasureDto } from 'src/dto/measure.dto';
import { $Enums, Measure } from '@prisma/client';
import { GetListDto } from 'src/dto/measure-list.dto';
import { MapperService } from 'src/misc/mapper/mapper.service';
import { ClassConstructor } from 'class-transformer';
import { Inject } from '@nestjs/common';

describe('MeasureRepository', () => {
  let repository: MeasureRepository;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MeasureRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Usando o mock do PrismaService
        },
      ],
    }).compile();

    repository = module.get<MeasureRepository>(MeasureRepository);
  });

//   it('should create a measure', async () => {
//     const createMeasureDto: CreateMeasureDto = {
//       customer_code: 'teste',
//       measure_datetime: '2025-09-28T00:00:00Z',
//       measure_type: 'water'.toUpperCase() as $Enums.Measure_Type,
//       measure_value: 123,
//       image_url: 'https://imgur.com/K7V8sL8',
//     };

//     const measureToInstance = await mapper.toInstance(
//       createMeasureDto,
//       this.entity,
//     );

//     const result = await repository.create(createMeasureDto);
//     expect(result).toEqual(createMeasureDto);
//     expect(mockPrismaService.measure.create).toHaveBeenCalledWith({
//       data: createMeasureDto,
//     });
//   });

//   it('should find measure by UUID', async () => {
//     const result = await repository.findByUuid('existing-uuid');
//     expect(result).toEqual({
//       measure_uuid: 'existing-uuid',
//       measure_value: 74.64,
//       measure_type: 'WATER',
//       measure_datetime: new Date(),
//       has_confirmed: true,
//     });
//     expect(mockPrismaService.measure.findFirst).toHaveBeenCalledWith({
//       where: { measure_uuid: 'existing-uuid' },
//     });
//   });

  it('should update a measure', async () => {
    const confirmMeasureDto = {
      measure_uuid: 'uuid-123',
      confirmed_value: 80,
    };

    const result = await repository.update(confirmMeasureDto);
    expect(result).toEqual({
      measure_uuid: 'uuid-123',
      measure_value: 80,
      measure_type: 'WATER',
      measure_datetime: new Date(),
      has_confirmed: true,
    });
    expect(mockPrismaService.measure.update).toHaveBeenCalledWith({
      where: { measure_uuid: confirmMeasureDto.measure_uuid },
      data: {
        has_confirmed: true,
        measure_value: confirmMeasureDto.confirmed_value,
      },
    });
  });

  it('should list multiple measures', async () => {
    const getListDto: GetListDto = { customer_code:'teste' };

    const result = await repository.getList(getListDto);
    expect(result).toEqual([
      {
        measure_uuid: 'uuid-123',
        measure_value: 74.64,
        measure_type: 'WATER',
        measure_datetime: new Date(),
        has_confirmed: false,
      },
      {
        measure_uuid: 'uuid-456',
        measure_value: 100,
        measure_type: 'GAS',
        measure_datetime: new Date(),
        has_confirmed: true,
      },
    ]);
    expect(mockPrismaService.measure.findMany).toHaveBeenCalledWith({
      where: getListDto,
    });
  });
});
