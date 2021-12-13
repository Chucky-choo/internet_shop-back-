import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BasketEntity } from '../../basket/entities/basket.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ nullable: true, unique: true })
  email?: string;

  @Column({
    unique: true,
  })
  phoneNumber: string;

  @Column()
  password: string;

  @OneToOne(() => BasketEntity, { nullable: true })
  @JoinColumn({ name: 'basketId' })
  basket?: BasketEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}
