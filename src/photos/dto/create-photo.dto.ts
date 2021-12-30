import { IsNotEmpty } from 'class-validator';

export class CreatePhotoDto {
  @IsNotEmpty()
  url: string;
}
