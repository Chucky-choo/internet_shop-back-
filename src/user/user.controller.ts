import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { productToBasketDto } from './dto/productToBasket.dto';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UsersService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @Get('order/:id')
  findOrders(@Param('id') id: string) {
    return this.userService.findOrders(+id);
  }

  @Patch('/addProduct')
  addProductToBasket(@Body() dto: productToBasketDto) {
    return this.userService.addProductToBasket(dto);
  }

  @Patch('/pickUpFromTheBasket')
  pickUpFromTheBasket(@Body() dto: productToBasketDto) {
    return this.userService.pickUpFromTheBasket(dto);
  }

  @Delete('/basket/:id')
  cleanTheBasket(@Param('id') id: string) {
    return this.userService.cleanTheBasket(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
}
