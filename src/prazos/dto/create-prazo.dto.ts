import { IsNotEmpty } from 'class-validator';
import { TipoPrazo } from '@prisma/client';

export class CreatePrazoDto {

    @IsNotEmpty()
    idcronograma: string;

    @IsNotEmpty()
    prazo_tipo: TipoPrazo;

    @IsNotEmpty()
    data_entrega: string;

    @IsNotEmpty()
    data_retorno: string;
}
