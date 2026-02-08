import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { CreateLoginUserDto } from './dto/login-user.dto';
import { RolesService } from '../roles/roles.service';
import { ProductService } from '../product/product.service';
import { productToBasketDto } from './dto/productToBasket.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private roleRepository: RolesService,
    private productService: ProductService,
  ) {}

  async create(dto: CreateUserDto) {
    const existing = await this.repository.findOne({
      where: [{ phoneNumber: dto.phoneNumber }, { email: dto.email }],
    });

    if (existing) {
      const field = existing.phoneNumber === dto.phoneNumber ? 'номер' : 'пошта';
      throw new ConflictException(`Така ${field} вже існує`);
    }

    const user = this.repository.create(dto);
    const role = await this.roleRepository.getRoleByValue('USER');
    user.roles = [role];
    return await this.repository.save(user);
  }

  findAll() {
    return this.repository.find({ relations: ['basket'] });
  }

  findOne(id: number): Promise<UserEntity> {
    return this.repository.findOne({
      where: {
        id: +id,
      },
    });
  }

  async findOneWitchCart(idUser: number): Promise<UserEntity> {
    const a=  await this.repository.findOne({
      where: {
        id: idUser,
      },
      relations: ['cart'],
    });
    console.log(a)
    return a
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.repository.findOne({
      where: { id: +id },
      relations: ['roles', 'cart'],
    });
  }

  async findByCond(cond: CreateLoginUserDto) {
    return await this.repository.findOne({
      where: cond,
      relations: ['roles', 'cart'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.repository.update(id, updateUserDto);
    return await this.repository.findOne({ where: { id: 1 } });
  }

  async addProductToBasket({ idUser, idProduct }: productToBasketDto) {
    const user = await this.findOneWitchCart(idUser);
    const product = await this.productService.findProductMain(idProduct);
    user.cart.push(product);
    await this.repository.save(user);
    return product;
  }

  async pickUpFromTheBasket({ idUser, idProduct }: productToBasketDto) {
    const user = await this.findOneWitchCart(idUser);
    user.cart = user.cart.filter(el => el.id !== idProduct);
    await this.repository.save(user);
    return await this.findOneWitchCart(idUser);
  }

  async cleanTheBasket(idUser: number) {
    const user = await this.findOneWitchCart(idUser);
    user.cart = [];
    await this.repository.save(user);
    return await this.findOneWitchCart(idUser);
  }

  async findOrders(id: number) {
    const user = await this.repository.findOne({
      where: {
        id,
      },
      relations: ['orders'],
    });
    const { orders } = user;
    return orders;
  }
}
