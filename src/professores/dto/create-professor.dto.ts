import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { CreateUsuarioDto } from '../../usuarios/dto/create-usuario.dto';
import { NivelAcesso } from '@prisma/client';
export class CreateProfessorDto extends CreateUsuarioDto {
    // id_professor String       @id @default(uuid())
    // departamento String
    // usuarioId    String       @unique
    // usuario      Usuario      @relation(fields: [usuarioId], references: [id])
    // Orientador   Orientador[]
    // Cronograma   Cronograma[]
    // Banca1       Banca[]      @relation("Professor1")
    // Banca2       Banca[]      @relation("Professor2")

    @IsString()
    @IsNotEmpty()
    departamento: string;


    @IsEmpty()
    // @IsOptional()
    nivel_acesso: NivelAcesso; // setado como professor
}