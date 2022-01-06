import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProductEntity } from '../../product/entities/product.entity';

@Entity()
export class PhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => ProductEntity, (product) => product.photos)
  product: ProductEntity;
}
