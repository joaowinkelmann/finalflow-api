import { PartialType } from '@nestjs/mapped-types';
import { TransferCoordenadorDto } from './transfer-coordenador.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCoordenadorDto extends PartialType(TransferCoordenadorDto) {

    @IsNotEmpty()
    @IsString()
    departamento?: string;

}
