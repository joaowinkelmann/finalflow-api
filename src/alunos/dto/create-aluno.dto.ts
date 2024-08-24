import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
export class CreateAlunoDto {
  @IsNumber()
  @IsNotEmpty(
    {
      message: 'Informe a matrícula do aluno',
    }
  )
  matricula: number;

  @IsString()
  @IsNotEmpty()
  cursoId: string;

  @IsString()
  @IsNotEmpty()
  idUsuario: string;
}
