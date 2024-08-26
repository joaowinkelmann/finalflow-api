import { PartialType } from '@nestjs/mapped-types';
import { CreateBancaDto } from './create-banca.dto';

export class UpdateBancaDto extends PartialType(CreateBancaDto) {}
