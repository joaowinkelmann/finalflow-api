import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { CreateUsuarioDto } from '../../usuarios/dto/create-usuario.dto';
import { NivelAcesso } from '@prisma/client';
export class CreateProfessorDto extends CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    departamento: string;

    @IsEmpty()
    // @IsOptional()
    nivel_acesso: NivelAcesso; // setado como professor
}