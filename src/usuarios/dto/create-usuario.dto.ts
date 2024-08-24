import { NivelAcesso } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsStrongPassword, IsOptional } from "class-validator";

export class CreateUsuarioDto {
  @IsNotEmpty({
    message: "O campo nome é obrigatório",
  })
  nome: string;

  @IsEmail({}, {
    message: "O campo email deve ser um endereço de email válido",
  })
  email: string;

  @IsOptional()
  @IsStrongPassword({}, {
    message: "A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais",
  })
  senha: string;

  @IsNotEmpty({
    message: "O campo nível de acesso é obrigatório",
  })
  nivel_acesso: NivelAcesso;
}
