import { NivelAcesso } from "@prisma/client";

export class UpdateUsuarioDto {
    nome?: string;
    email?: string;
    senha?: string;
    // nivel_acesso?: NivelAcesso;
}
