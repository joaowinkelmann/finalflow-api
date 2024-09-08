import { IsBase64, IsNotEmpty, IsString } from "class-validator";

export class CreateDocumentoDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsBase64()
    @IsNotEmpty()
    arquivo: string;

    @IsString()
    @IsNotEmpty()
    idreuniao: string;
}