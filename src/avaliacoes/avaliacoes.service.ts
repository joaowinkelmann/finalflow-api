import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AvaliacoesService {
  constructor(private prisma: PrismaService) { }
  async create(createAvaliacaoDto: CreateAvaliacaoDto) {
    return await this.prisma.avaliacao.create({
      data: createAvaliacaoDto
    })

  }

  async findAll() {
    return await this.prisma.avaliacao.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.avaliacao.findUnique({
      where: {
        id_avaliacao: id
      }
    }).catch((error) => {
      console.log(error);
      throw new NotFoundException('Avaliação não encontrada');
    });
  }

  async update(id: string, updateAvaliacaoDto: UpdateAvaliacaoDto) {
    return await this.prisma.avaliacao.update({
      where: { id_avaliacao: id },
      data: updateAvaliacaoDto,
    }).catch((error) => {
      console.log(error);
      throw new NotFoundException('Avaliação não encontrada');
    });
  }

  async remove(id: string) {
    return await this.prisma.avaliacao.delete({
      where: { id_avaliacao: id },
    }).catch((error) => {
      console.log(error);
      throw new NotFoundException("Avaliação não encontrada");
    }).then(() => {
      return {
        message: "Avaliação removida com sucesso"
      };
    });
  }
}
