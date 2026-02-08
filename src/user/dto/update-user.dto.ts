import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @Length(4)
  password: string;

  @IsNotEmpty()
  phoneNumber: string;
}
