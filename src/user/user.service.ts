import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { MapperService } from 'src/misc/mapper/mapper.service';
import { User } from '@prisma/client';
import { ClassConstructor } from 'class-transformer';
import { CreateUserDto, ResponseUserDto, UserDto } from './dto/User.dto';

@Injectable()
export class UserService {
  private readonly entity: ClassConstructor<User>;
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mapper: MapperService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const existingUser = await this.userRepository.findUserByCustomerCode(
      createUserDto.customerCode,
    );

    if (existingUser) {
      throw new ConflictException('Customer code already exists');
    }
    const toInstance = this.mapper.toInstance(createUserDto, this.entity);

    return await this.userRepository.createUser(toInstance);
  }

  async findAll(): Promise<ResponseUserDto[]> {
    const result = await this.userRepository.findAll();

    if (!result || null) {
      throw new NotFoundException('No active sellers found');
    }

    return result;
  }

  async findOne(search: Partial<User>): Promise<ResponseUserDto> {
    if (Object.keys(search).length === 0) {
      throw new BadRequestException(
        'At least one search parameter must be provided',
      );
    }

    const user = await this.userRepository.findOne(search);

    if (!user || null) {
      throw new NotFoundException("User doesn't exist or is inactive");
    }

    return user;
  }

  async update(id: number, userDto: UserDto): Promise<ResponseUserDto> {
    try {
      return await this.userRepository.update(+id, userDto);
    } catch (e) {
      throw new Error(e);
    }
  }

  async delete(id: number): Promise<ResponseUserDto> {
    try {
      return await this.userRepository.delete(+id);
    } catch (e) {
      throw new Error(e);
    }
  }
}
