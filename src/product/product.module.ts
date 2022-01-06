import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { AuthModule } from 'src/auth/auth.module';
import { FileService } from 'src/file/file.service';
import { PhotosModule } from '../photos/photos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    forwardRef(() => AuthModule),
    PhotosModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, FileService],
  exports: [ProductService],
})
export class ProductModule {}
