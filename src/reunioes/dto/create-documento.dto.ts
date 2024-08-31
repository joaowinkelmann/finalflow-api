
// id_documento String  @id @default(uuid())
// nome         String
// arquivo      String
// reuniaoId    String
// Reuniao      Reuniao @relation(fields: [reuniaoId], references: [id_reuniao])

import { IsBase64, IsNotEmpty, IsString } from "class-validator";

export class CreateDocumentoDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsBase64()
    @IsNotEmpty()
    arquivo: string;

    @IsString()
    @IsNotEmpty()
    reuniaoId: string;
}