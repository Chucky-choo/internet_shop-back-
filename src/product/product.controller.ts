import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photos', maxCount: 10 }]))
  create(@UploadedFiles() files, @Body() createProductDto: CreateProductDto) {
    const { photos } = files;
    return this.productService.create(createProductDto, photos);
  }

  @Post('/getFiltered')
  findAllFiltered(@Body() data) {
    return this.productService.findAllFiltered(data);
  }

  @Get('/discounts/:gender')
  findDiscounts(@Param('gender') gender: string) {
    return this.productService.findDiscounts(gender);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Get('/photos/:id')
  findOnlyPhotos(@Param('id') id: string) {
    return this.productService.findOnlyPhotos(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
