import { SetMetadata } from "@nestjs/common";
import { NivelAcesso } from "@prisma/client";

export const NIVEISACESSO_KEY = 'nivelAcesso';
export const NiveisAcesso = (...nivelAcesso: NivelAcesso[]) => SetMetadata(NIVEISACESSO_KEY, nivelAcesso);