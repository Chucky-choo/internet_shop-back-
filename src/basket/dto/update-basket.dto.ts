import { IsNotEmpty } from 'class-validator';

export class UpdateBasketDto {
  @IsNotEmpty()
  productId: number;
}
