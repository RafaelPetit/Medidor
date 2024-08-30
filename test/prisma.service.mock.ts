export const mockPrismaService = {
  measure: {
    create: jest.fn().mockResolvedValue({
      measure_uuid: 'uuid-123',
      measure_value: 123,
      measure_type: 'WATER',
      measure_datetime: new Date(),
      has_confirmed: false,
    }),

    findFirst: jest.fn().mockImplementation((params) => {
      if (params.where.measure_uuid === 'existing-uuid') {
        return Promise.resolve({
          measure_uuid: 'existing-uuid',
          measure_value: 74.64,
          measure_type: 'WATER',
          measure_datetime: new Date(),
          has_confirmed: true,
        });
      }
      return Promise.resolve(null);
    }),

    update: jest.fn().mockResolvedValue({
      measure_uuid: 'uuid-123',
      measure_value: 80,
      measure_type: 'WATER',
      measure_datetime: new Date(),
      has_confirmed: true,
    }),

    findMany: jest.fn().mockResolvedValue([
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
    ]),
  },
};
