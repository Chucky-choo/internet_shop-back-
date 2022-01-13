import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty } from 'class-validator';
import { Status } from '../statusEnum';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsNotEmpty()
  id: number;

  status: Status;
}
