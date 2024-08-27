import { ApiProperty, ApiResponse, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsOptional, IsDate } from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'returns user id',
  })
  @IsInt({ message: 'id must be a int' })
  @IsNotEmpty({ message: 'id must not be empty ' })
  @IsOptional()
  id: number;

  @ApiProperty({
    description: "returns user's name",
    example: 'Rafael',
  })
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name must not be empty' })
  @IsOptional()
  name: string;

  @ApiProperty({
    description: "returns user's customerCode",
    example: 'Ra3157',
  })
  @IsString({ message: 'customerCode must be a string' })
  @IsNotEmpty({ message: 'customerCode must not be empty' })
  @IsOptional()
  customerCode: string;

  @ApiProperty({
    description: "returns User's creation date",
    example: '2024-08-27 13:37:52',
  })
  @IsNotEmpty({ message: 'createdAt must not be empty ' })
  @IsDate({ message: 'createdAt must me a date' })
  @IsOptional()
  createdAt: Date;

  @ApiProperty({
    description: "returns User's last updated date",
    example: '2024-08-27 16:21:52',
  })
  @IsNotEmpty({ message: 'id must not be empty ' })
  @IsDate({ message: 'updatedAt must me a date' })
  @IsOptional()
  updatedAt: Date;
}

export class CreateUserDto {
  @ApiProperty({
    description: "user's name",
    example: 'Rafael',
  })
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name must not be empty' })
  name: string;

  @ApiProperty({
    description: "curstumer's code",
    example: 'Ra3157',
  })
  @IsString({ message: 'customer code must be a string' })
  @IsNotEmpty({ message: 'customer code must not be empty' })
  customerCode: string;
}

export class ResponseUserDto {
  @ApiProperty({
    description: 'returns user id',
  })
  id: number;

  @ApiProperty({
    description: "returns user's name",
    example: 'Rafael',
  })
  name: string;

  @ApiProperty({
    description: "returns user's customerCode",
    example: 'Ra3157',
  })
  customerCode: string;

  @ApiProperty({
    description: "returns User's creation date",
    example: '2024-08-27 13:37:52',
  })
  createdAt: Date;

  @ApiProperty({
    description: "returns User's last updated date",
    example: '2024-08-27 16:21:52',
  })
  updatedAt?: Date;
}

export class PartialUserDto extends PartialType(UserDto) {}
