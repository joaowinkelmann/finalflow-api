import { PartialType } from '@nestjs/mapped-types';
import { CreatePrazoDto } from './create-prazo.dto';

export class UpdatePrazoDto extends PartialType(CreatePrazoDto) {}
