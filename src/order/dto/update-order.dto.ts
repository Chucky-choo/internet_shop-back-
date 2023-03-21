import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Status } from '../statusEnum';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsNotEmpty()
  id: number;

  @IsOptional()
  status: Status;

  @IsOptional()
  comment: string;

  @IsOptional()
  productId: number[];
}
