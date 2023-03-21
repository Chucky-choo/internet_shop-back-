import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { UniqueOnDatabase } from '../UniqueValidation/UniqueValidation';
import { UserEntity } from '../entities/user.entity';

export class UpdateUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  @IsEmail()
  @UniqueOnDatabase(UserEntity)
  email: string;

  @IsOptional()
  @Length(4)
  password: string;

  @IsNotEmpty()
  phoneNumber: string;
}
