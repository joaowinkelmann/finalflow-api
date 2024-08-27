import { PartialType } from '@nestjs/mapped-types';
import { TransferCoordenadorDto } from './transfer-coordenador.dto';

export class UpdateCoordenadorDto extends PartialType(TransferCoordenadorDto) {}
