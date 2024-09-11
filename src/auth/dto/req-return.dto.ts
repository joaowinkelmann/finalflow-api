import { NivelAcesso } from "@prisma/client";

export class ReqReturnDto {
  user: {
    sub: string;
    email: string;
    nivel_acesso: NivelAcesso;
    iat: number;
    exp: number;
  };
}