import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PhotoEntity } from '../../photos/entities/photo.entity';

export enum Gender {
  Man = 'man',
  Woman = 'woman',
}

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

  @Column({ nullable: true })
  gender: Gender;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}
