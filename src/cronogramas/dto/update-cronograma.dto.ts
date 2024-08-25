import { PartialType } from '@nestjs/mapped-types';
import { CreateCronogramaDto } from './create-cronograma.dto';

export class UpdateCronogramaDto extends PartialType(CreateCronogramaDto) {}
