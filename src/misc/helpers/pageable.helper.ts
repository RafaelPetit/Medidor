// paginator.ts
import { PrismaClient, Prisma } from '@prisma/client';

export interface Pageable<T> {
  page?: number;
  itemsPerPage?: number;
  sortBy?: keyof T;
}

export interface PaginatedResult<T> {
  page: number;
  totalItems: number;
  totalPages: number;
  items: T[];
}

export class Paginator {
  constructor(private readonly prisma: PrismaClient) {}

  async paginate<T>(
    model: Prisma.ModelName,
    pageable: Pageable<T>,
  ): Promise<PaginatedResult<T>> {
    const page = pageable.page || 1;
    const perPage = pageable.itemsPerPage || 10;
    const totalItems = await this.prisma[model].count();
    const totalPages = Math.ceil(totalItems / perPage);
    const orderBy = pageable.sortBy ? { [pageable.sortBy]: 'asc' } : undefined;

    const items = await this.prisma[model].findMany({
      skip: (page - 1) * perPage,
      orderBy,
      take: perPage,
    });

    return {
      page,
      totalItems,
      totalPages,
      items,
    };
  }
}
