import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from 'src/roles/roles.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), RolesModule, ProductModule],
  controllers: [UserController],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersService],
})
export class UserModule {}
