import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from '../statusEnum';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @ManyToMany(() => ProductEntity)
  @JoinTable({ name: 'productsInOrder' })
  productsInOrder?: ProductEntity[];

  @Column()
  status: Status;

  @Column({ nullable: true })
  comment: string;

  @Column()
  cityName: string;

  @Column()
  department: string;

  @Column()
  size: string;
}
