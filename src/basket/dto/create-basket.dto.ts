import { IsNotEmpty } from 'class-validator';

export class CreateBasketDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  productId?: number;
}
