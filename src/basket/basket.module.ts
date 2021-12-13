import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketEntity } from './entities/basket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BasketEntity])],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
