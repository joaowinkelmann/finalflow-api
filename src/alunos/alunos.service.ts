import { Injectable, InternalServerErrorException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
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
  ) { }

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
          idusuario: usuario.idusuario,
        }
      });

      return aluno;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.aluno.findMany({
        include: {
          usuario: {
            select: {
              nome: true,
              email: true
            }
          }
        }
      });
    }
    catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    return await this.prisma.aluno.findUnique({
      where: {
        id_aluno: id
      }
    }).catch((error) => {
      console.log(error);
      throw new NotFoundException("Aluno não encontrado");
    });
  }

  async update(id: string, updateAlunoDto: UpdateAlunoDto) {
    const aluno = await this.prisma.aluno.update({
      where: {
        id_aluno: id
      },
      data: updateAlunoDto
    }).catch((error) => {
      throw new NotFoundException("Aluno não encontrado");
    });

    return aluno;
  }

  async remove(id: string) {
    await this.prisma.aluno.delete({
      where: {
        id_aluno: id
      }
    }).catch((error) => {
      console.log(error);

      switch (error.code) {
        case 'P2025':
          throw new NotFoundException("Aluno não encontrado");
        case 'P2003':
          throw new UnprocessableEntityException("Não foi possível remover o aluno. Existem orientações associadas a ele");
        default:
          throw new InternalServerErrorException("Não foi possível remover o aluno");
      }


    });

    return {
      message: "Aluno removido com sucesso"
    };
  }
}
