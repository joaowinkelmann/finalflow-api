import { PartialType } from '@nestjs/mapped-types';
import { CreateReunioeDto } from './create-reunioe.dto';

export class UpdateReunioeDto extends PartialType(CreateReunioeDto) {}
