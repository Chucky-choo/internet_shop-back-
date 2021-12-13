import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { UserEntity } from '../entities/user.entity';
import { UniqueOnDatabase } from '../UniqueValidation/UniqueValidation';

export class CreateUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  @IsEmail()
  @UniqueOnDatabase(UserEntity)
  email?: string;

  @Length(4)
  password: string;

  @IsNotEmpty()
  @UniqueOnDatabase(UserEntity)
  phoneNumber: string;

  @IsOptional()
  basketId?: number;
}
