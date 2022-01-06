import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoEntity } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from '../product/entities/product.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(PhotoEntity)
    private PhotoRepository: Repository<PhotoEntity>,
  ) {}

  async create(createPhotoDto: CreatePhotoDto) {
    return await this.PhotoRepository.save(createPhotoDto);
  }

  remove(id: number) {
    this.PhotoRepository.delete(id);
  }
}
