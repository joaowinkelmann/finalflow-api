import { Injectable } from '@nestjs/common';
import { CreateOrientacaoDto } from './dto/create-orientacao.dto';
import { UpdateOrientacaoDto } from './dto/update-orientacao.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class OrientacoesService {
  constructor(private prisma: PrismaService) {}
  create(createOrientacaoDto: CreateOrientacaoDto) {
    // return 'This action adds a new orientacao';
    return this.prisma.orientacao.create({
      data: createOrientacaoDto,
    });
  }

  findAll() {
    // return `This action returns all Orientacaos`;

    return this.prisma.orientacao.findMany();
  }

  findOne(id: string) {
    // return `This action returns a #${id} orientacao`;

    return this.prisma.orientacao.findUnique({
      where: {
        id_orientacao: id,
      },
    });
  }

  update(id: string, updateOrientacaoDto: UpdateOrientacaoDto) {
    return `This action updates a #${id} orientacao`;
  }

  remove(id: string) {
    return `This action removes a #${id} orientacao`;
  }
}
