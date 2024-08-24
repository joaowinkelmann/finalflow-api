import { IsNotEmpty } from "class-validator";

export class CreateCursoDto {
  @IsNotEmpty({
    message: "Informe um nome para o curso",
  })
  nome: string;
}
