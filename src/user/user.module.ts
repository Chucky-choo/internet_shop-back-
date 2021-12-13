import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersService],
})
export class UserModule {}
