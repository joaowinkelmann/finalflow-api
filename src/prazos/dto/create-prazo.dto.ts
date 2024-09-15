import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';
import { TipoPrazo } from '@prisma/client';

export class CreatePrazoDto {

    @IsNotEmpty()
    idcronograma: string;

    @IsNotEmpty()
    @IsEnum(TipoPrazo)
    prazo_tipo: TipoPrazo;

    @IsNotEmpty()
    @IsDateString()
    data_entrega: Date;

    @IsNotEmpty()
    @IsDateString()
    data_retorno: Date;
}
