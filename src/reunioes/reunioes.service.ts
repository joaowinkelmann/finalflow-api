import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateReuniaoDto } from './dto/create-reuniao.dto';
import { UpdateReuniaoDto } from './dto/update-reuniao.dto';
import { PrismaService } from 'prisma/prisma.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { NivelAcesso } from '@prisma/client';

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
    }).then((documento) => {
      return documento;
    }).catch((err) => {
      console.log(err);
      throw new UnprocessableEntityException('Erro ao criar documento.');
    });
  }

  async getReunioes(idusuario: string, nivel_acesso: NivelAcesso) {
    let idKey;
    let idkeyvalue;
  
    // Verifica o tipo de usuário e busca o id correspondente
    if (nivel_acesso === 'professor' || nivel_acesso === 'coordenador') {
      const professor = await this.prisma.professor.findUnique({
        where: {
          idusuario: idusuario,
        },
        select: {
          id_professor: true,
        },
      });
      if (!professor) {
        throw new NotFoundException('Professor não encontrado');
      }
      idkeyvalue = professor.id_professor;
      idKey = 'idprofessor';
    } else if (nivel_acesso === 'aluno') {
      const aluno = await this.prisma.aluno.findUnique({
        where: {
          idusuario: idusuario,
        },
        select: {
          id_aluno: true,
        },
      });
      if (!aluno) {
        throw new NotFoundException('Aluno não encontrado');
      }
      idkeyvalue = aluno.id_aluno;
      idKey = 'idaluno';
    } else {
      throw new Error('Tipo de usuário inválido');
    }
  
    // Pega as orientações relacionadas ao usuário
    const orientacoes = await this.prisma.orientacao.findMany({
      where: {
        [idKey]: idkeyvalue,
      },
      select: {
        id_orientacao: true,
      },
    });
  
    if (!orientacoes.length) {
      throw new NotFoundException('Nenhuma orientação encontrada');
    }
  
    // Pega as reuniões relacionadas às orientações
    return await this.prisma.reuniao.findMany({
      where: {
        idorientacao: {
          in: orientacoes.map((orientacao) => orientacao.id_orientacao),
        },
      },
      include: {
        Documento: true
      }
    }).catch((err) => {
      console.log(err);
      throw new NotFoundException('Reuniões não encontradas');
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
    const reuniao =  await this.prisma.reuniao.update({
      where: {
        id_reuniao: id
      },
      data: {
        idorientacao: updateReuniaoDto.idorientacao,
        data_reuniao: updateReuniaoDto.data_reuniao,
        descricao: updateReuniaoDto.descricao
      }
    })

    if(reuniao == null){
      throw new NotFoundException('Reunião não encontrado');
    }

    return {
      message: "Sucesso ao atualizar o reunião",
      reuniao: reuniao
    }
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
