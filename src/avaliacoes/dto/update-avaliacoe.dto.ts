import { PartialType } from '@nestjs/mapped-types';
import { CreateAvaliacoeDto } from './create-avaliacoe.dto';

export class UpdateAvaliacoeDto extends PartialType(CreateAvaliacoeDto) {}
