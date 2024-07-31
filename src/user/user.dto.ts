import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SignUp {
  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  cPassword: string;
}
