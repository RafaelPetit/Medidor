import { Injectable } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';

@Injectable()
export class MapperService {
  toInstance<V, T>(dto: V, classConstructor: ClassConstructor<T>): T {
    return plainToInstance(classConstructor, dto, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }

  toInstanceList<V, T>(
    dtoList: V[],
    classConstructor: ClassConstructor<T>,
  ): T[] {
    return dtoList.map((dto) =>
      plainToInstance(classConstructor, dto, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      }),
    );
  }
}
