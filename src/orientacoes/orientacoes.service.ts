import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrientacaoDto } from './dto/create-orientacao.dto';
import { UpdateOrientacaoDto } from './dto/update-orientacao.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class OrientacoesService {
  constructor(private prisma: PrismaService) {}
  async create(createOrientacaoDto: CreateOrientacaoDto) {
    // verifica se createOrientacaoDto.orientadorId é um professor
    const professor = await this.prisma.professor.findUnique({
      where: {
        id_professor: createOrientacaoDto.idprofessor,
      },
    });

    if (!professor) {
      throw new NotFoundException('Professor não encontrado');
    }

    // verifica se createOrientacaoDto.alunoId é um aluno
    const aluno = await this.prisma.aluno.findUnique({
      where: {
        id_aluno: createOrientacaoDto.idaluno,
      },
    });

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }

    // return;

    // verificou tudo, pode criar a orientação então

    return await this.prisma.orientacao.create({
      data: createOrientacaoDto,
    });
  }

  async findAll() {
    return this.prisma.orientacao.findMany();
  }

  async getOrientacoesByProfessor(idusuario: string) {
    return this.prisma.orientacao.findMany({
      where: {
        idprofessor: idusuario,
      },
      // fazer join com a table de usuario
    });
  }

  async findOne(id: string) {
    return await this.prisma.orientacao.findUnique({
      where: {
        id_orientacao: id,
      },
    });
  }

  async update(id: string, updateOrientacaoDto: UpdateOrientacaoDto) {
    return await this.prisma.orientacao.update({
      where: {
        id_orientacao: id,
      },
      data: updateOrientacaoDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.orientacao.delete({
      where: {
        id_orientacao: id,
      },
    });
  }
}
