import { NivelAcesso } from "@prisma/client";
import { IsBase64, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditUsuarioDto {
    // nome?: string;
    // email?: string;
    // senha?: string;
    // // nivel_acesso?: NivelAcesso;

    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsOptional()
    @IsBase64()
    avatar: string;
}
