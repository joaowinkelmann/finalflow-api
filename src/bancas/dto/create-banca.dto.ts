
// id_banca     String      @id @default(uuid())
// cronogramaId String
// alunoId      String
// professor1Id String
// professor2Id String
// Cronograma   Cronograma  @relation(fields: [cronogramaId], references: [id_cronograma])
// Aluno        Aluno       @relation(fields: [alunoId], references: [id_aluno])
// Professor1   Professor   @relation("Professor1", fields: [professor1Id], references: [id_professor])
// Professor2   Professor   @relation("Professor2", fields: [professor2Id], references: [id_professor])
// Avaliacao    Avaliacao[]

import { IsNotEmpty, IsString } from "class-validator";

// orientacaoId String     @unique // uma banca tem somente uma orientação
// Orientacao   Orientacao @relation(fields: [orientacaoId], references: [id_orientacao])

// @@unique([professor1Id, professor2Id, cronogramaId])

export class CreateBancaDto {
    @IsString()
    @IsNotEmpty()
    cronogramaId: string;

    @IsString()
    @IsNotEmpty()
    alunoId: string;

    @IsString()
    @IsNotEmpty()
    professor1Id: string;

    @IsString()
    @IsNotEmpty()
    professor2Id: string;

    @IsString()
    @IsNotEmpty()
    orientacaoId: string;
}
