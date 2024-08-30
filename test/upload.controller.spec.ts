// upload.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { MeasureService } from '../src/measure/measure.service';
import { GeminiService } from '../src/gemini/gemini.service';

describe('AppController', () => {
  let controller: AppController;
  let service: MeasureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        MeasureService,
        {
          provide: GeminiService,
          useValue: {
            getMeasureFromImage: jest.fn().mockResolvedValue({
              imageUrl: 'http://example.com/image.png',
              measureValue: 123,
              measureUuid: 'uuid-123',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<MeasureService>(MeasureService);
  });

  it('should upload image and return measure', async () => {
    const result = await controller.upload({
      image: 'base64encodedimage',
      customer_code: 'customer1',
      measure_datetime: '2025-09-28T00:00:00Z',
      measure_type: 'WATER',
    });

    expect(result).toEqual({
      image_url: 'http://example.com/image.png',
      measure_value: 123,
      measure_uuid: 'uuid-123',
    });
  });

  it('should throw error if data is invalid', async () => {
    jest.spyOn(service, 'upload').mockImplementation(() => {
      throw new Error('INVALID_DATA');
    });

    await expect(
      controller.upload({
        image: 'invalidbase64',
        customer_code: 'customer1',
        measure_datetime: '2025-09-28T00:00:00Z',
        measure_type: 'INVALID',
      }),
    ).rejects.toThrow('INVALID_DATA');
  });

  it('should throw conflict error if measure exists', async () => {
    jest.spyOn(service, 'upload').mockImplementation(() => {
      throw new Error('DOUBLE_REPORT');
    });

    await expect(
      controller.upload({
        image: 'base64encodedimage',
        customer_code: 'customer1',
        measure_datetime: '2025-09-28T00:00:00Z',
        measure_type: 'WATER',
      }),
    ).rejects.toThrow('DOUBLE_REPORT');
  });
});
