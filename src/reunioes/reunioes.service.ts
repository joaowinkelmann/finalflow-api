import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReuniaoDto } from './dto/create-reuniao.dto';
import { UpdateReuniaoDto } from './dto/update-reuniao.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ReunioesService {
  constructor(private prisma: PrismaService) { }
  async create(createReuniaoDto: CreateReuniaoDto) {


    // verificar se a orientacao existe
    const orientacao = await this.prisma.orientacao.findUnique({
      where: {
        id_orientacao: createReuniaoDto.orientacaoId
      }
    });

    if (!orientacao) {
      throw new NotFoundException(`Orientação não encontrada`);
    }

    return await this.prisma.reuniao.create({
      data: {
        orientacaoId: createReuniaoDto.orientacaoId,
        dataReuniao: createReuniaoDto.dataReuniao,
        descricao: createReuniaoDto.descricao
      }
    });
  }

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
        orientacaoId: updateReuniaoDto.orientacaoId,
        dataReuniao: updateReuniaoDto.dataReuniao,
        descricao: updateReuniaoDto.descricao
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
