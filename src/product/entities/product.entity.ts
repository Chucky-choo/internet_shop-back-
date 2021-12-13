import { BasketEntity } from 'src/basket/entities/basket.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  photos: string;

  @Column({ nullable: true })
  count: number;

  @Column()
  description: string;

  @Column()
  size: string;

  @Column({ nullable: true })
  weight: string;

  @Column({ nullable: true })
  color?: string;

  @Column({ nullable: true })
  material?: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  salePrice?: number;

  @ManyToMany(() => BasketEntity)
  @JoinColumn({ name: 'basketId' })
  basket?: BasketEntity;
}
