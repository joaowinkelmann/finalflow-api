import { IsDateString, IsJSON, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, ValidateIf } from 'class-validator';

export class CreateAlertaDto {
    // @IsNotEmpty()
    // @IsString()
    @IsOptional()
    idprazo?: string;

    @IsOptional()
    idreuniao?: string;

    @IsNotEmpty()
    @IsString()
    idusuario: string;
    
    @IsNotEmpty()
    @IsString()
    assunto: string;

    @IsNotEmpty()
    @IsString()
    mensagem?: string | undefined;

    @IsNotEmpty()
    @IsDateString()
    data_envio: Date;

    @IsOptional()
    @IsString()
    template?: string;

    @IsOptional()
    // @ValidateIf
    @IsNotEmptyObject()
    contexto?: Record<string, any> | undefined;
}