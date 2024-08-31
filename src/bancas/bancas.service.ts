import { Injectable } from '@nestjs/common';
import { CreateBancaDto } from './dto/create-banca.dto';
import { UpdateBancaDto } from './dto/update-banca.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BancasService {
  constructor(private prisma: PrismaService) { }
  async defineBanca(createBancaDto: CreateBancaDto) {
    return await this.prisma.banca.create({
      data: {
        cronogramaId: createBancaDto.cronogramaId,
        alunoId: createBancaDto.alunoId,
        professor1Id: createBancaDto.professor1Id,
        professor2Id: createBancaDto.professor2Id,
        orientacaoId: createBancaDto.orientacaoId,
      }
    });
  }

  findAll() {
    return `This action returns all bancas`;
  }

  findOne(id: string) {
    return `This action returns a #${id} banca`;
  }

  update(id: string, updateBancaDto: UpdateBancaDto) {
    return `This action updates a #${id} banca`;
  }

  remove(id: string) {
    return `This action removes a #${id} banca`;
  }
}
