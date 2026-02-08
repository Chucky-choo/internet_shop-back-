import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { ProductService } from '../product/product.service';
import { UsersService } from 'src/user/user.service';
import { Status } from './statusEnum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private repository: Repository<OrderEntity>,
    private productService: ProductService,
    private userService: UsersService,
  ) {}

  setProducts(order, productsIdArr) {
    productsIdArr.forEach(async (id) => {
      const product = await this.productService.findProductMain(id);
      order.productsInOrder.push(product);
    });
    return this.repository.save(order);
  }

  findOrderProducts(idOrder: number) {
    return this.repository.findOne({
      where: { id: idOrder },
      relations: ['productsInOrder'],
    });
  }

  async create(createOrderDto: CreateOrderDto) {
    const { userId, productId, ...restDto } = createOrderDto;
    const user = await this.userService.findOne(userId);

    const preCreateOrder = await this.repository.save({
      user,
      status: Status.Processed,
      ...restDto,
    });

    const order = await this.findOrderProducts(preCreateOrder.id);

    return this.setProducts(order, productId);
  }

  async findOneById(id: number) {
    const order = await this.repository.findOne({ where: { id } });
    if (order) {
      return order;
    } else {
      throw new NotFoundException(null, 'Не знайдено такого замовлення');
    }
  }

  findAll() {
    return this.repository.find({ relations: ['user', 'productsInOrder'] });
  }

  findIncomplete() {
    return this.repository.find({
      relations: ['user', 'productsInOrder'],
      where: [{ status: Status.Processed }, { status: Status.Sent }],
    });
  }

  // findUserOrders(idUser: number) {
  //   return this.repository.find({
  //     relations: ['user', 'productsInOrder'],
  //     where: [{ user.id: idUser }],
  //   });
  // }

  async update(updateOrderDto: UpdateOrderDto) {
    const order = await this.findOneById(updateOrderDto.id);
    order.status = updateOrderDto.status;
    order.comment = updateOrderDto.comment;
    order.productsInOrder = [];

    return this.setProducts(order, updateOrderDto.productId);
  }

  async remove(id: number) {
    await this.repository.delete(id);
    return 'Замовлення було успішно видалено';
  }
}
