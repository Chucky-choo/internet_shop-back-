import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.repository.save(createProductDto);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const commodity = await this.repository.findOne(id);
    if (!commodity) {
      throw new NotFoundException(null, 'не знайдено такий товар');
    }
    return commodity;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.repository.findOne(id);
    if (product) {
      await this.repository.update(id, updateProductDto);
      return this.repository.findOne(id);
    } else {
      return 'нема такого товару';
    }
  }

  async remove(id: number) {
    const product = await this.repository.findOne(id);
    if (product) {
      this.repository.delete(id);
    } else {
      return 'нема такого товару';
    }
  }
}
