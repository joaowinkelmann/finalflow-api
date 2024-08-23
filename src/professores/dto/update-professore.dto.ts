import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessoreDto } from './create-professore.dto';

export class UpdateProfessoreDto extends PartialType(CreateProfessoreDto) {}
