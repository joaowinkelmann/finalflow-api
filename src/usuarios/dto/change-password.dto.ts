import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { IsStrongPasswordOptions } from "class-validator";

const passwordOptions: IsStrongPasswordOptions = {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0
};

export class ChangePasswordDto {
    @IsNotEmpty()
    @IsStrongPassword(passwordOptions, {
        message: "A senha deve conter no mínimo 8 caracteres, 1 letra minúscula, 1 letra maiúscula e 1 número."
    })
    "senha": string;

    @IsNotEmpty({
        message: "A senha antiga é obrigatória."
    })
    @IsString()
    "senhaold": string;
}