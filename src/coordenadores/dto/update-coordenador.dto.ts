import { PartialType } from '@nestjs/mapped-types';
import { CreateCoordenadorDto } from './create-coordenador.dto';

export class UpdateCoordenadorDto extends PartialType(CreateCoordenadorDto) {}
