import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { CreateLoginUserDto } from './dto/login-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private roleRepository: RolesService,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.repository.create(dto);
    console.log(user);
    const role = await this.roleRepository.getRoleByValue('ADMIN');
    user.roles = [role];
    return await this.repository.save(user);
  }

  findAll() {
    return this.repository.find({ relations: ['basket'] });
  }

  findById(id: number): Promise<UserEntity> {
    return this.repository.findOne(+id, { relations: ['roles'] });
  }

  findByCond(cond: CreateLoginUserDto) {
    return this.repository.findOne(cond, { relations: ['roles'] });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.repository.update(id, updateUserDto);
    return this.repository.findOne(id);
  }
}
