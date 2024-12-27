import { IsInt, IsNotEmpty, IsDate, IsNumber, IsString } from 'class-validator';

export class signInDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

}