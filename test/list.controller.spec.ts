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
            getlist: jest.fn().mockResolvedValue([
              {
                measure_uuid: 'uuid-123',
                measure_datetime: '2025-09-28T00:00:00Z',
                measure_type: 'WATER',
                has_confirmed: false,
                image_url: 'http://example.com/image.png',
              },
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<MeasureService>(MeasureService);
  });

  it('should list measures successfully', async () => {
    const result = await controller.getlist('customer1', 
      'WATER',
    );

    expect(result).toEqual({
      customer_code: 'customer1',
      measures: [
        {
          measure_uuid: 'uuid-123',
          measure_datetime: '2025-09-28T00:00:00Z',
          measure_type: 'WATER',
          has_confirmed: false,
          image_url: 'http://example.com/image.png',
        },
      ],
    });
  });

  it('should throw error if measure type is invalid', async () => {
    jest.spyOn(service, 'getList').mockImplementation(() => {
      throw new Error('INVALID_TYPE');
    });

    await expect(
      controller.getlist('customer1', 'INVALID' ),
    ).rejects.toThrow('INVALID_TYPE');
  });

  it('should throw not found error if no measures found', async () => {
    jest.spyOn(service, 'getList').mockImplementation(() => {
      throw new Error('MEASURES_NOT_FOUND');
    });

    await expect(controller.getlist('customer1', )).rejects.toThrow(
      'MEASURES_NOT_FOUND',
    );
  });
});
