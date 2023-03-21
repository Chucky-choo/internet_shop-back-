import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  productId: number[];

  @IsOptional()
  comment: string;

  @IsOptional()
  cityName: string;

  @IsOptional()
  department: string;
}
