import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ProductEntity } from './product/entities/product.entity';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { RoleEntity } from './roles/entities/roles.entity';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PhotosModule } from './photos/photos.module';
import * as path from 'path';
import { PhotoEntity } from './photos/entities/photo.entity';
import { OrderModule } from './order/order.module';
import { OrderEntity } from './order/entities/order.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'xe',
      password: 'dedafu47',
      database: 'Edelweiss',
      entities: [
        UserEntity,
        ProductEntity,
        RoleEntity,
        PhotoEntity,
        OrderEntity,
      ],
      synchronize: true,
    }),
    UserModule,
    ProductModule,
    AuthModule,
    RolesModule,
    FileModule,
    PhotosModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
