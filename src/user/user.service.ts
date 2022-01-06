import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { CreateLoginUserDto } from './dto/login-user.dto';
import { RolesService } from '../roles/roles.service';
import { ProductService } from '../product/product.service';
import { productToBasketDto } from './dto/productToBasket.dto';
import { ProductEntity } from 'src/product/entities/product.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private roleRepository: RolesService,
    private productService: ProductService,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.repository.create(dto);
    const role = await this.roleRepository.getRoleByValue('USER');
    user.roles = [role];
    return await this.repository.save(user);
  }

  findAll() {
    return this.repository.find({ relations: ['basket'] });
  }

  findById(id: number): Promise<UserEntity> {
    return this.repository.findOne(+id, { relations: ['roles', 'cart'] });
  }

  findByCond(cond: CreateLoginUserDto) {
    return this.repository.findOne(cond, { relations: ['roles', 'cart'] });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.repository.update(id, updateUserDto);
    return this.repository.findOne(id);
  }

  async addProductToBasket({ idUser, idProduct }: productToBasketDto) {
    const user = await this.repository.findOne(idUser, {
      relations: ['cart'],
    });
    const product = await this.productService.findProductMain(idProduct);
    user.cart.push(product);
    await this.repository.save(user);
    return product;
  }

  async pickUpFromTheBasket({ idUser, idProduct }: productToBasketDto) {
    const user = await this.repository.findOne(idUser, {
      relations: ['cart'],
    });
    user.cart = user.cart.filter((el) => el.id !== idProduct);
    await this.repository.save(user);
    return await this.repository.findOne(idUser, {
      relations: ['cart'],
    });
  }
}
