import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBancaDto } from './dto/create-banca.dto';
import { UpdateBancaDto } from './dto/update-banca.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Cronograma } from './../cronogramas/entities/cronograma.entity';

@Injectable()
export class BancasService {
  constructor(private prisma: PrismaService) { }
  async defineBanca(createBancaDto: CreateBancaDto) {
    return await this.prisma.banca.create({
      data: {
        idcronograma: createBancaDto.idcronograma, // ja vai estar na orientacao, talvez daria pra tirar
        idaluno: createBancaDto.idaluno,
        idprofessor1: createBancaDto.idprofessor1,
        idprofessor2: createBancaDto.idprofessor2,
        idorientacao: createBancaDto.idorientacao,
      }
    }).catch((error) => {
      console.error(error);
      if (error.code == 'P2002' || error.code == 'P2003' || error.code == 'P2004') {
        throw new ConflictException('Os componentes da banca estão em conflito');
      }
      throw new ForbiddenException('Erro ao definir banca');
    });
  }

  // as bancas que um professor participa, trazendo junto as entregas das orientações
  async getMyBancas(idusuario: string) {
    const professor = await this.prisma.professor.findUnique({
      where: {
        idusuario: idusuario
      },
      select: {
        id_professor: true
      }
    });
  
    if (!professor) {
      throw new NotFoundException('Professor não encontrado');
    }
  
    const id_professor = professor.id_professor;
  
    return await this.prisma.banca.findMany({
      where: {
        OR: [
          {
            idprofessor1: id_professor
          },
          {
            idprofessor2: id_professor
          }
        ]
      },
      include: {
        Professor1: {
          include: {
            usuario: {
              select: {
                nome: true
              }
            }
          }
        },
        Professor2: {
          include: {
            usuario: {
              select: {
                nome: true
              }
            }
          }
        },
        Orientacao: {
          include: {
            Entrega: true
          }
        }
      }
    }).catch((error) => {
      console.error(error);
      throw new NotFoundException('Nenhuma banca encontrada');
    });
  }

  async findAll() {
    const bancas = await this.prisma.banca.findMany({
      include: {
        Cronograma: true,
        Professor1: true,
        Professor2: true,
        Orientacao: true
      },
    });


    if (bancas.length == 0) {
      throw new NotFoundException('Nenhuma banca cadastrada.');
    }

    return bancas;
  }

  async findOne(id: string) {
    const banca = await this.prisma.banca.findUnique({
      where: {
        id_banca: id,
      },
      include: {
        Cronograma: true,
        Professor1: true,
        Professor2: true,
        Orientacao: true
      },
    });

    if (banca == null) {
      throw new ForbiddenException('Banca não encontrada');
    }
    return banca;
  }

  async update(id: string, updateBancaDto: UpdateBancaDto) {
    return await this.prisma.banca.update({
      where: {
        id_banca: id
      },
      data: updateBancaDto
    }).catch((error) => {
      throw new NotFoundException("Banca não encontrada");
    });
  }

  async remove(id: string) {
    try {
      const bancaRemovido = await this.prisma.banca.delete({
        where: {
          id_banca: id
        }
      })

      return {
        message: "Banca removida com sucesso!"
      }
    } catch (error) {
      throw new ForbiddenException('Banca não encontrada para remoção');
    }
  }
}
