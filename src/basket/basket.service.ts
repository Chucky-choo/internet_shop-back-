import { Injectable } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasketEntity } from './entities/basket.entity';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(BasketEntity)
    private repository: Repository<BasketEntity>,
  ) {}

  create(dto: CreateBasketDto) {
    return this.repository.save({
      user: { id: dto.userId },
      product: [dto.productId],
    });
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  async update(id: number, dto: UpdateBasketDto) {
    //await this.repository.update(id, { products: dto.productId });
    return this.repository.findOne(id);
  }

  remove(id: number) {
    return `This action removes a #${id} basket`;
  }
}
