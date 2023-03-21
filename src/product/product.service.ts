import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, LessThan, MoreThan, Not, Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { FileService, FileType } from 'src/file/file.service';
import { PhotosService } from '../photos/photos.service';
// import dataSource from 'db/data-source';

// const productRepository = dataSource.getRepository(ProductEntity);

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
    if (photos.length > 1) {
      for (let i = 1; i < photos.length; i++) {
        const photoUrl = createFile(photos[i]);
        const res = await this.PhotosService.create({ url: photoUrl });
        picturePathArr.push(res);
      }
    }

    return this.repository.save({
      cover: coverUrl,
      photos: photos.length > 1 ? picturePathArr : null,
      ...createProductDto,
    });
  }

  async findAllFiltered(data): Promise<ProductEntity[]> {
    return await this.repository.find(data);
  }

  async findDiscounts(gender): Promise<ProductEntity[]> {
    if (gender) {
      return await this.repository.findBy({
        salePrice: MoreThan(0),
        gender: Equal(gender),
      });
    } else {
      return await this.repository.findBy({ salePrice: MoreThan(0) });
    }
  }

  async findOne(id: number): Promise<ProductEntity> {
    const commodity = await this.repository.findOne({
      where: { id },
      relations: ['photos'],
    });
    if (!commodity) {
      throw new NotFoundException(null, 'не знайдено такий товар');
    }
    return commodity;
  }

  findProductMain(id: number): Promise<ProductEntity> {
    const commodity = this.repository.findOne({
      where: { id },
      select: ['id', 'name', 'size', 'price', 'cover', 'salePrice'],
    });
    if (!commodity) {
      throw new NotFoundException(null, 'не знайдено такий товар');
    }
    return commodity;
  }

  async findOnlyPhotos(id: string) {
    try {
      const commodity = await this.repository.findOne({
        where: { id: +id },
        relations: ['photos'],
      });
      const { photos } = commodity;
      return photos;
    } catch (e) {
      throw new NotFoundException(null, 'не знайдено такий товар');
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.repository.findOne({ where: { id } });
    if (product) {
      await this.repository.update(id, {
        ...updateProductDto,
        updateAt: new Date(),
      });
      return this.repository.findOne({ where: { id } });
    } else {
      throw new NotFoundException(null, 'не знайдено такий товар');
    }
  }

  async remove(id: number) {
    const product = await this.repository.findOne({
      where: { id },
      relations: ['photos'],
    });

    this.fileService.deleteFile(
      product.cover.replace(/http:\/\/localhost:7777\//, ''),
    );
    if (product) {
      product.photos.forEach((el, index) => {
        this.fileService.deleteFile(
          el.url.replace(/http:\/\/localhost:7777\//, ''),
        );
        this.PhotosService.remove(product.photos[index].id);
      });
      this.repository.delete(id);
      return 'Товар був успішно видалений';
    } else {
      throw new NotFoundException(null, 'не знайдено такий товар');
    }
  }
}
