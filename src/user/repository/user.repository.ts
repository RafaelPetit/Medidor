import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/misc/prisma/prisma.service';
import { $Enums, User } from '@prisma/client';
import { PartialUserDto, ResponseUserDto, UserDto } from '../u/User.dto';
import { parseSearchToPrisma } from 'src/misc/helpers/search.helper';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(user: User): Promise<ResponseUserDto> {
    const finalUser = await this.prismaService.user.create({ data: user });
    const responseUserDto: ResponseUserDto = {
      id: finalUser.id,
      name: finalUser.name,
      customerCode: finalUser.customer_code,
      createdAt: finalUser.created_at,
    };
    return responseUserDto;
  }

  async findOne(partialUserDto: PartialUserDto): Promise<ResponseUserDto> {
    const where = {
      ...parseSearchToPrisma(partialUserDto),
      status: $Enums.Status.ACTIVE,
    };

    const item = await this.prismaService.user.findFirst({ where });
    return item;
  }

  async findAll(): Promise<ResponseUserDto[]> {
    return await this.prismaService.user.findMany();
  }

  async findUserByCustomerCode(customerCode: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { customerCode: customerCode },
    });
  }

  async update(id: number, userDto: UserDto): Promise<ResponseUserDto> {
    return await this.prismaService.user.update({
      where: { id: +id },
      data: userDto,
    });
  }

  async delete(id: number): Promise<ResponseUserDto> {
    return await this.prismaService.user.update({
      where: { id: +id },
      data: { status: $Enums.Status.INACTIVE },
    });
  }
}
