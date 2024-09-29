import { TipoAvaliacao } from "@prisma/client";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAvaliacaoDto {
    @IsString()
    @IsOptional()
    idbanca: string;

    @IsString()
    @IsNotEmpty()
    idorientacao: string;

    @IsString()
    @IsOptional()
    identrega: string;

    @IsString()
    @IsNotEmpty()
    avaliacao_tipo: TipoAvaliacao;

    @IsDateString()
    // @IsOptional()
    data_avaliacao: Date;

    @IsString()
    @IsOptional()
    criterio: string;

    @IsNumber()
    @IsOptional() // ver se pode ser opcional mesmo, acho que cria e dps atualiza talvez?
    nota: number;

    @IsString()
    @IsOptional()
    comentario: string;
}
