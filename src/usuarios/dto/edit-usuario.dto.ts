import { NivelAcesso } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class EditUsuarioDto {
    // nome?: string;
    // email?: string;
    // senha?: string;
    // // nivel_acesso?: NivelAcesso;

    @IsNotEmpty()
    @IsString()
    nome: string;
}
