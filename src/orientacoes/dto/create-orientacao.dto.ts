import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateOrientacaoDto {

    @IsString()
    @IsNotEmpty()
    idprofessor: string;

    @IsString()
    @IsNotEmpty()
    titulo_trabalho: string;

    @IsString()
    @IsNotEmpty()
    idaluno: string;

    @IsDateString()
    @IsNotEmpty()
    data_inicio: Date;

    @IsDateString()
    @IsNotEmpty()
    data_fim: Date;

    @IsString()
    @IsNotEmpty()
    idcronograma: string;
}

