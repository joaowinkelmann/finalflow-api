import { PartialType } from '@nestjs/mapped-types';
import { CreateOrientacaoDto } from './create-orientacao.dto';

export class UpdateOrientacaoDto extends PartialType(CreateOrientacaoDto) {}
