import { Injectable } from '@nestjs/common';
import { CreateCoordenadorDto } from './dto/create-coordenador.dto';
import { UpdateCoordenadorDto } from './dto/update-coordenador.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class CoordenadoresService {
  constructor(
    private prisma: PrismaService,
    private usuariosService: UsuariosService
  ) { }

  create(createCoordenadorDto: CreateCoordenadorDto) {

    try {
      this.usuariosService.create({
        nome: createCoordenadorDto.nome,
        email: createCoordenadorDto.email,
        nivel_acesso: 'professor',
      }).then((usuario) => {
        this.prisma.professor.create({
          data: {
            departamento: createCoordenadorDto.departamento,
            idUsuario: usuario.id,
          }
        });
      }
      ).then((professor) => {
        return professor;
      });
    } catch (error) {
      return error.message;
    }

    // return 'This action adds a new professore';
  }

  findAll() {
    return `This action returns all professores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} professore`;
  }

  update(id: number, updateCoordenadorDto: UpdateCoordenadorDto) {
    return `This action updates a #${id} professore`;
  }

  remove(id: number) {
    return `This action removes a #${id} professore`;
  }
}
