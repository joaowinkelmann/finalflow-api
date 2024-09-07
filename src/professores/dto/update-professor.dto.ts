import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessorDto } from './create-professor.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProfessorDto{
    
    @IsString()
    @IsNotEmpty()
    departamento: string;
}
