import { IsNotEmpty, IsOptional } from 'class-validator';
import { Gender } from '../entities/product.entity';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  count: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  size: string;

  @IsOptional()
  weight: string;

  @IsNotEmpty()
  color: string;

  @IsOptional()
  material: string;

  @IsNotEmpty()
  price: number;

  @IsOptional()
  salePrice: number;

  @IsOptional()
  gender: Gender;
}
