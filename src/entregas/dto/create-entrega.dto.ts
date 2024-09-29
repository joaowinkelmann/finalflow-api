import { TipoPrazo } from "@prisma/client";
import { IsBase64, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEntregaDto {
    @IsString()
    @IsNotEmpty()
    idorientacao: string;

    @IsString()
    @IsEnum(TipoPrazo)
    prazo_tipo: TipoPrazo;

    @IsNotEmpty()
    @IsBase64()
    arquivo: string;
}
