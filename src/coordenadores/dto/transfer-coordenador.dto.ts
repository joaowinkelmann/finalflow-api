import {IsString, IsNotEmpty } from 'class-validator';
import { UpdateUsuarioDto } from 'src/usuarios/dto/update-usuario.dto';

export class TransferCoordenadorDto extends UpdateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  idProfessorNovoCoordenador: string;
}
