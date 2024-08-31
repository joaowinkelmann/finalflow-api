import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateOrientacaoDto {
    // id_orientacao String    @id @default(uuid())
    // orientadorId  String
    // idBanca       String
    // alunoId       String
    // dataInicio    DateTime  @db.Timestamptz(3)
    // dataFim       DateTime? @db.Timestamptz(3)
    // Professor     Professor @relation(fields: [orientadorId], references: [id_professor])
    // Aluno         Aluno     @relation(fields: [alunoId], references: [id_aluno])
    // Reuniao       Reuniao[]
    // Banca         Banca? // uma orientação tem somente uma banca
    // Avaliacao     Avaliacao[]

    @IsString()
    @IsNotEmpty()
    orientadorId: string; // id do professor -> tabela Professor

    @IsString()
    @IsNotEmpty()
    tituloTrabalho: string;

    @IsString()
    @IsNotEmpty()
    alunoId: string;

    @IsDateString()
    @IsNotEmpty()
    dataInicio: Date;

    @IsDateString()
    @IsNotEmpty()
    dataFim: Date;
}

