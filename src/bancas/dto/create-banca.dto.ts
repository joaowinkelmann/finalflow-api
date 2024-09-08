import { IsNotEmpty, IsString } from "class-validator";

export class CreateBancaDto {
    @IsString()
    @IsNotEmpty()
    idcronograma: string;

    @IsString()
    @IsNotEmpty()
    idaluno: string;

    @IsString()
    @IsNotEmpty()
    idprofessor1: string;

    @IsString()
    @IsNotEmpty()
    idprofessor2: string;

    @IsString()
    @IsNotEmpty()
    idorientacao: string;
}
