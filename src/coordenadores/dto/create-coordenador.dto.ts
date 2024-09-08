import { NivelAcesso } from '@prisma/client';
import { IsNotEmpty, IsEmail, IsEmpty, IsOptional } from 'class-validator';

export class CreateCoordenadorDto {
  @IsNotEmpty({
    message: "O campo nome é obrigatório",
  })
  nome: string;

  @IsEmail({}, {
    message: "O campo email deve ser um endereço de email válido",
  })
  email: string;

  @IsEmpty()
  @IsOptional()
  nivel_acesso: NivelAcesso;
}
