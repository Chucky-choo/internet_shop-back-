import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  photos: string;

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
}
