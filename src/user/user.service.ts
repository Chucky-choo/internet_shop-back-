import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { CreateLoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  create(dto: CreateUserDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  findById(id: number): Promise<UserEntity> {
    return this.repository.findOne(+id);
  }

  findByCond(cond: CreateLoginUserDto) {
    return this.repository.findOne(cond);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.repository.update(id, updateUserDto);
    return this.repository.findOne(id);
  }
}
