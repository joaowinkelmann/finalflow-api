import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
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
  cursoId: string;

  // @IsString()
  // @IsNotEmpty()
  // idUsuario: string;
}
