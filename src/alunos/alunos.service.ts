import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class AlunosService {
  constructor(
    private prisma: PrismaService,
    private usuariosService: UsuariosService
  ) {}

  async create(createAlunoDto: CreateAlunoDto) {
    try {
      this.usuariosService.create({
        nome: createAlunoDto.nome,
        email: createAlunoDto.email,
        senha: createAlunoDto.senha,
        nivel_acesso: 'aluno',
      }).then((usuario) => {
        this.prisma.aluno.create({
          data: {
            matricula: createAlunoDto.matricula,
            cursoId: createAlunoDto.cursoId,
            idUsuario: usuario.id,
          }
        });
      }
      ).then((aluno) => {
        return aluno;
      });
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    try {
      return await this.prisma.aluno.findMany();
    }
    catch (error) {
      return error.message;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} aluno`;
  }

  update(id: number, updateAlunoDto: UpdateAlunoDto) {
    return `This action updates a #${id} aluno`;
  }

  remove(id: number) {
    return `This action removes a #${id} aluno`;
  }
}
