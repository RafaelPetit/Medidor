import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from 'src/app.controller';
import { MeasureService } from 'src/measure/measure.service';

describe('AppController', () => {
  let controller: AppController;
  let service: MeasureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: MeasureService,
          useValue: {
            confirm: jest.fn().mockResolvedValue({ success: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<MeasureService>(MeasureService);
  });

  it('should confirm measure successfully', async () => {
    const result = await controller.confirm({
      measure_uuid: 'uuid-123',
      confirmed_value: 74.64,
    });

    expect(result).toEqual({ success: true });
  });

  it('should throw error if data is invalid', async () => {
    jest.spyOn(service, 'confirm').mockImplementation(() => {
      throw new Error('INVALID_DATA');
    });

    await expect(
      controller.confirm({
        measure_uuid: 'invalid-uuid',
        confirmed_value: 74.64,
      }),
    ).rejects.toThrow('INVALID_DATA');
  });

  it('should throw error if measure not found', async () => {
    jest.spyOn(service, 'confirm').mockImplementation(() => {
      throw new Error('MEASURE_NOT_FOUND');
    });

    await expect(
      controller.confirm({
        measure_uuid: 'non-existent-uuid',
        confirmed_value: 74.64,
      }),
    ).rejects.toThrow('MEASURE_NOT_FOUND');
  });

  it('should throw conflict error if measure already confirmed', async () => {
    jest.spyOn(service, 'confirm').mockImplementation(() => {
      throw new Error('CONFIRMATION_DUPLICATE');
    });

    await expect(
      controller.confirm({
        measure_uuid: 'uuid-123',
        confirmed_value: 74.64,
      }),
    ).rejects.toThrow('CONFIRMATION_DUPLICATE');
  });
});
