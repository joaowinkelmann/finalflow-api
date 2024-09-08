import { NotAcceptableException, Injectable, NotFoundException } from '@nestjs/common';
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
    const orientacaoProfessor = await this.prisma.orientacao.findMany({
      where: {
        idprofessor: idusuario,
      },
      // fazer join com a table de usuario
    });

    if(orientacaoProfessor == null){
      throw new NotAcceptableException('Nenhuma orientação encontrado do professor com id:' + idusuario);
    }

    return orientacaoProfessor;
  }

  async findOne(id: string) {
    const findOne =  await this.prisma.orientacao.findUnique({
      where: {
        id_orientacao: id,
      },
    });

    if(findOne == null){
      throw new NotAcceptableException('Orientação não encontrada');
    }

    return findOne;
  }

  async update(id: string, updateOrientacaoDto: UpdateOrientacaoDto) {
    try {
      const updateOrientacao = await this.prisma.orientacao.update({
        where: {
          id_orientacao: id,
        },
        data: updateOrientacaoDto,
      });
    
      return {
        message: "Atualizado com sucesso!",
        orientacao: updateOrientacao,
      };
    } catch (error) {
      if (error.code === 'P2025') { 
        throw new NotAcceptableException('Orientação não encontrada para update');
      } else {
        throw error;
      }
    }    
  }

  async remove(id: string) {
    try {
      const deleteOrientacao = await this.prisma.orientacao.delete({
        where: {
          id_orientacao: id,
        },
      });
    
      return {
        message: 'Sucesso ao excluir!',
        orientacao: deleteOrientacao,
      };
    } catch (error) {
      if (error.code === 'P2025') { 
        throw new NotAcceptableException('Não foi possível excluir a orientação, por favor informe um id válido');
      } else {
        throw error; 
      }
    }    
  }
}
