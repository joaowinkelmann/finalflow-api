import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReuniaoDto } from './dto/create-reuniao.dto';
import { UpdateReuniaoDto } from './dto/update-reuniao.dto';
import { PrismaService } from 'prisma/prisma.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';

@Injectable()
export class ReunioesService {
  constructor(private prisma: PrismaService) { }
  async create(createReuniaoDto: CreateReuniaoDto) {


    // verificar se a orientacao existe
    const orientacao = await this.prisma.orientacao.findUnique({
      where: {
        id_orientacao: createReuniaoDto.idorientacao
      }
    });

    if (!orientacao) {
      throw new NotFoundException(`Orientação não encontrada`);
    }

    return await this.prisma.reuniao.create({
      data: {
        idorientacao: createReuniaoDto.idorientacao,
        data_reuniao: createReuniaoDto.data_reuniao,
        descricao: createReuniaoDto.descricao
      }
    });
  }

  async createDocumento(createDocumentoDto: CreateDocumentoDto) {
    return await this.prisma.documento.create({
      data: {
        nome: createDocumentoDto.nome,
        arquivo: createDocumentoDto.arquivo,
        idreuniao: createDocumentoDto.idreuniao
      }
    });
  }

  // como professor, busco todas as reunioes que eu criei e participo, relacionadas com meus orientandos
  async getStudentReunioes(idusuario: string) {
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

    // pega as orientacoes que o professor participa
    const orientacoes = await this.prisma.orientacao.findMany({
      where: {
        idprofessor: id_professor
      },
      select: {
        id_orientacao: true
      }
    });

    // pega as reunioes das orientacoes
    const reunioes = await this.prisma.reuniao.findMany({
      where: {
        idorientacao: {
          in: orientacoes.map(orientacao => orientacao.id_orientacao)
        }
      }
    });
  }

  // como aluno, busco todas as reunioes que eu criei e participo, relacionadas com meus orientandos
  async getMyReunioes(idusuario: string) {
    const aluno = await this.prisma.aluno.findUnique({
      where: {
        idusuario: idusuario
      },
      select: {
        id_aluno: true
      }
    });
    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }

    const id_aluno = aluno.id_aluno;

    // pega as orientacoes que o aluno participa
    const orientacoes = await this.prisma.orientacao.findMany({
      where: {
        idaluno: id_aluno
      },
      select: {
        id_orientacao: true
      }
    });

    // pega as reunioes das orientacoes
    const reunioes = await this.prisma.reuniao.findMany({
      where: {
        idorientacao: {
          in: orientacoes.map(orientacao => orientacao.id_orientacao)
        }
      }
    });
  }

  async findAll() {
    return await this.prisma.reuniao.findMany({
      include: {
        Documento: true
      }
    });
  }

  async findOne(id: string) {
    return await this.prisma.reuniao.findUnique({
      where: {
        id_reuniao: id
      },
      include: {
        Documento: true
      }
    });
  }

  async update(id: string, updateReuniaoDto: UpdateReuniaoDto) {
    return await this.prisma.reuniao.update({
      where: {
        id_reuniao: id
      },
      data: {
        idorientacao: updateReuniaoDto.idorientacao,
        data_reuniao: updateReuniaoDto.data_reuniao,
        descricao: updateReuniaoDto.descricao
      }
    })
  }

  async updateDocumento(updateDocumentoDto: UpdateDocumentoDto) {
    const documento =  await this.prisma.documento.update({
      where: {
        id_documento: updateDocumentoDto.id_documento
      },
      data: {
        nome: updateDocumentoDto.nome,
        arquivo: updateDocumentoDto.arquivo,
        idreuniao: updateDocumentoDto.idreuniao
      }
    });

    if(documento == null){
      throw new NotFoundException('Documento não encontrado');
    }

    return {
      message: "Sucesso ao atualizar o documento",
      documento: documento
    }
  }

  async remove(id: string) {
    return await this.prisma.reuniao.delete({
      where: {
        id_reuniao: id
      }
    });
  }
}
