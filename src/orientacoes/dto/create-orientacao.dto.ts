export class CreateOrientacaoDto {
    // id_orientacao String    @id @default(uuid())
    // professorId   String
    // alunoId       String
    // dataInicio    DateTime  @db.Timestamptz(3)
    // dataFim       DateTime? @db.Timestamptz(3)
    // Professor     Professor @relation(fields: [professorId], references: [id_professor])
    // Aluno         Aluno     @relation(fields: [alunoId], references: [id_aluno])
    // Reuniao       Reuniao[]


    professorId: string;
    alunoId: string;
    dataInicio: Date;
    dataFim: Date;
}

