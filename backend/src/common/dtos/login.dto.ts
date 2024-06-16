import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
    
  @IsEmail()
  @IsNotEmpty()
  user_email!: string;

  @IsString()
  @IsNotEmpty()
  user_password!: string;
}
