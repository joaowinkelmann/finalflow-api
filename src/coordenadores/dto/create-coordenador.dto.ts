import {IsString, IsNotEmpty } from 'class-validator';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';

export class CreateCoordenadorDto extends CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  departamento:  string;
}
