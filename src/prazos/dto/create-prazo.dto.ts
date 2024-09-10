import { IsEnum, IsNotEmpty } from 'class-validator';
import { TipoPrazo } from '@prisma/client';

export class CreatePrazoDto {

    @IsNotEmpty()
    idcronograma: string;

    @IsNotEmpty()
    @IsEnum(TipoPrazo)
    prazo_tipo: TipoPrazo;

    @IsNotEmpty()
    data_entrega: string;

    @IsNotEmpty()
    data_retorno: string;
}
