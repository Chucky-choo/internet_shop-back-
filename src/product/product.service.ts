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
import { FileService, FileType } from 'src/file/file.service';
import { PhotosService } from '../photos/photos.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
    private fileService: FileService,
    private PhotosService: PhotosService,
  ) {}

  async create(createProductDto: CreateProductDto, photos) {
    const createFile = (photoFile) =>
      this.fileService.createFile(FileType.IMAGE, photoFile);

    const coverUrl = createFile(photos[0]);

    const picturePathArr = [];

    for (let i = 1; i < photos.length; i += 1) {
      const photoUrl = createFile(photos[i]);
      const res = await this.PhotosService.create({ url: photoUrl });
      picturePathArr.push(res);
    }
    return this.repository.save({
      cover: coverUrl,
      photos: picturePathArr,
      ...createProductDto,
    });
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const commodity = await this.repository.findOne(id, {
      relations: ['photos'],
    });
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
      return 'Товар був успішно видалений';
    } else {
      return 'нема такого товару';
    }
  }
}
