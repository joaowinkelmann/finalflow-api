import { Injectable } from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class ProfessoresService {
  constructor(
    private prisma: PrismaService,
    private usuariosService: UsuariosService
  ) { }

  create(createProfessorDto: CreateProfessorDto) {

    try {
      this.usuariosService.create({
        nome: createProfessorDto.nome,
        email: createProfessorDto.email,
        nivel_acesso: 'professor',
      }).then((usuario) => {
        this.prisma.professor.create({
          data: {
            departamento: createProfessorDto.departamento,
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

  update(id: number, updateProfessorDto: UpdateProfessorDto) {
    return `This action updates a #${id} professore`;
  }

  remove(id: number) {
    return `This action removes a #${id} professore`;
  }
}
