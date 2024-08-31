

// id_reuniao   String      @id @default(uuid())
// orientacaoId String
// dataReuniao  DateTime    @db.Timestamptz(3)
// descricao    String
// Documento    Documento[]
// Orientacao   Orientacao  @relation(fields: [orientacaoId], references: [id_orientacao])

import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateReuniaoDto {
    @IsString()
    @IsNotEmpty()
    orientacaoId: string;

    @IsDateString()
    @IsNotEmpty()
    dataReuniao: Date;

    @IsString()
    @IsNotEmpty()
    descricao: string;
}
