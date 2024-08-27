import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, PartialUserDto, ResponseUserDto, UserDto } from './dto/User.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    type: ResponseUserDto,
    description: 'Create a single user',
  })
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseUserDto> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiResponse({
    type: ResponseUserDto,
    description: 'Find one User',
  })
  async findOne(
    @Body() partialUserDto: PartialUserDto,
  ): Promise<ResponseUserDto> {
    return await this.userService.findOne(partialUserDto);
  }

  @Get('/all')
  @ApiResponse({
    type: ResponseUserDto,
    description: 'Find all Users',
  })
  async findAll(): Promise<ResponseUserDto[]> {
    return await this.userService.findAll();
  }

  @Patch(':id')
  @ApiResponse({
    type: ResponseUserDto,
    description: 'Modify a User',
  })
  async update(
    @Param('id') id: number,
    @Body() UserDto: UserDto,
  ): Promise<ResponseUserDto> {
    return await this.userService.update(+id, UserDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: ResponseUserDto,
    description: 'Delete one User',
  })
  async delete(
    @Param('id') id: number,
  ): Promise<ResponseUserDto> {
      return await this.userService.delete(+id);
}
}