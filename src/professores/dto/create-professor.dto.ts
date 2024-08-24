import { CreateUsuarioDto } from '../../usuarios/dto/create-usuario.dto';
export class CreateProfessorDto extends CreateUsuarioDto {
    // id_professor String       @id @default(uuid())
    // departamento String
    // usuarioId    String       @unique
    // usuario      Usuario      @relation(fields: [usuarioId], references: [id])
    // Orientador   Orientador[]
    // Cronograma   Cronograma[]
    // Banca1       Banca[]      @relation("Professor1")
    // Banca2       Banca[]      @relation("Professor2")

    departamento: string;
}