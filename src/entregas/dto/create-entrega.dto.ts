// model Entrega {
//     id_entrega   String     @id @default(uuid())
//     prazo_tipo   TipoPrazo // Linka o tipo de prazo (Proposta, TC, etc)
//     data_envio   DateTime   @db.Timestamptz(3) // Data de envio da proposta/TC
//     arquivo      String // O arquivo enviado pelo aluno
//     idaluno      String
//     aluno        Aluno      @relation(fields: [idaluno], references: [id_aluno])
//     idorientacao String
//     orientacao   Orientacao @relation(fields: [idorientacao], references: [id_orientacao])
//     idprazo      String
//     prazo        Prazo      @relation(fields: [idprazo], references: [id_prazo])

import { IsBase64, IsNotEmpty, IsString } from "class-validator";

export class CreateEntregaDto {
    // @IsString()
    // @IsNotEmpty()
    // idaluno: string;

    @IsString()
    @IsNotEmpty()
    idorientacao: string;

    @IsString()
    @IsNotEmpty()
    idprazo: string;

    @IsNotEmpty()
    @IsBase64()
    arquivo: string;
}
