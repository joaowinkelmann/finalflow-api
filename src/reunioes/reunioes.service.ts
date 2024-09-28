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

  // async getStudentReunioes(id: string) { // professor
  // async getMyReunioes(id: string) { // aluno

  async findAll() {
    return await this.prisma.reuniao.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.reuniao.findUnique({
      where: {
        id_reuniao: id
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
    });
  }

  async updateDocumento(updateDocumentoDto: UpdateDocumentoDto) {
    return await this.prisma.documento.update({
      where: {
        id_documento: updateDocumentoDto.id_documento
      },
      data: {
        nome: updateDocumentoDto.nome,
        arquivo: updateDocumentoDto.arquivo,
        idreuniao: updateDocumentoDto.idreuniao
      }
    });
  }

  async remove(id: string) {
    return await this.prisma.reuniao.delete({
      where: {
        id_reuniao: id
      }
    });
  }
}
