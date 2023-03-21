import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  //needed jwt
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  // @Get('user/:id')
  // findUserOrders(@Param('id') id: string) {
  //   return this.orderService.findUserOrders(+id);
  // }

  @Get()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  findAll() {
    return this.orderService.findAll();
  }

  @Get('Incomplete')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  findIncomplete() {
    return this.orderService.findIncomplete();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOrderProducts(+id);
  }

  @Patch()
  update(@Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
