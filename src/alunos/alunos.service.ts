import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { NivelAcesso } from '@prisma/client';

@Injectable()
export class AlunosService {
  constructor(
    private prisma: PrismaService,
    private usuariosService: UsuariosService
  ) {}

  async create(createAlunoDto: CreateAlunoDto) {
    try {
      const usuario = await this.usuariosService.create({
        nome: createAlunoDto.nome,
        email: createAlunoDto.email,
        nivel_acesso: NivelAcesso.aluno
      });
      const aluno = await this.prisma.aluno.create({
        data: {
          matricula: createAlunoDto.matricula,
          idcurso: createAlunoDto.idcurso,
          idusuario: usuario.id_usuario,
        }
      });

      return aluno;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.aluno.findMany();
    }
    catch (error) {
      return error;
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
