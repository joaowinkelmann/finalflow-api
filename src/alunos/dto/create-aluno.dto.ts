import { NivelAcesso } from '@prisma/client';
import { IsNumber, IsString, IsNotEmpty, IsEmpty, IsOptional } from 'class-validator';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';

export class CreateAlunoDto extends CreateUsuarioDto {
  @IsNumber()
  @IsNotEmpty(
    {
      message: 'Informe a matrícula do aluno',
    }
  )
  matricula: number;

  @IsString()
  @IsNotEmpty(
      {
        message: 'Informe o id do curso',
      }
  )
  idcurso: string;

  // @IsString()
  // @IsNotEmpty()
  @IsEmpty()
  idusuario: string;

  @IsEmpty()
  // @IsOptional()
  nivel_acesso: NivelAcesso; // setado como aluno
}
