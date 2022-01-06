import { IsNotEmpty } from 'class-validator';

export class productToBasketDto {
  @IsNotEmpty()
  idUser: number;

  @IsNotEmpty()
  idProduct: number;
}
