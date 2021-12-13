import { IsNotEmpty, Length } from 'class-validator';

export class CreateLoginUserDto {
  @IsNotEmpty()
  phoneNumber: string;

  @Length(6, 32, { message: 'Пароль повинен містити від 6 до 32 символів' })
  password: string;
}
