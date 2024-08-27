import { Module } from '@nestjs/common';
import { MapperModule } from 'src/misc/mapper/mapper.module';
import { UserController } from './user.controller';
import { UserRepository } from './repository/user.repository';
import { UserService } from './user.service';

@Module({
  imports: [MapperModule],
  controllers: [UserController],
  providers: [UserRepository],
  exports:[UserService]
})
export class UserModule {}
