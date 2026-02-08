import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @Length(4)
  password: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsOptional()
  basketId?: number;
}
