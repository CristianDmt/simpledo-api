import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
