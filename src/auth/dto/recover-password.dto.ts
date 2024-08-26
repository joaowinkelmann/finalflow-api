import { IsEmail, IsNotEmpty } from "class-validator";

export class RecoverPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
};