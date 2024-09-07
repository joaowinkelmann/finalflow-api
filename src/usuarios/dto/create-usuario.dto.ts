import { NivelAcesso } from "@prisma/client";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUsuarioDto {
  @IsNotEmpty({
    message: "O campo nome é obrigatório",
  })
  nome: string;

  @IsEmail({}, {
    message: "O campo email deve ser um endereço de email válido",
  })
  email: string;

  @IsNotEmpty({
    message: "O campo nível de acesso é obrigatório",
  })
  nivel_acesso: NivelAcesso;
}
