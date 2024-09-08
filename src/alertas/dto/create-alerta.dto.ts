import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateAlertaDto {
    // @IsNotEmpty()
    // @IsString()
    idprazo: string;

    @IsNotEmpty()
    @IsString()
    idusuario: string;
    
    @IsNotEmpty()
    @IsString()
    assunto: string;

    @IsNotEmpty()
    @IsString()
    mensagem: string;

    @IsNotEmpty()
    @IsDateString()
    data_envio: string;
}