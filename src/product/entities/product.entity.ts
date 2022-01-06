import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PhotoEntity } from '../../photos/entities/photo.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  cover: string;

  @OneToMany(() => PhotoEntity, (photo) => photo.product)
  photos: PhotoEntity[];

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
}
