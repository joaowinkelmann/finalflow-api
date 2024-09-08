import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateReuniaoDto {
    @IsString()
    @IsNotEmpty()
    idorientacao: string;

    @IsDateString()
    @IsNotEmpty()
    data_reuniao: Date;

    @IsString()
    @IsNotEmpty()
    descricao: string;
}
