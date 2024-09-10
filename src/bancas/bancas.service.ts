import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBancaDto } from './dto/create-banca.dto';
import { UpdateBancaDto } from './dto/update-banca.dto';
import { PrismaService } from 'prisma/prisma.service';

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
    });
  }

  async findAll() {
    const bancas = await this.prisma.banca.findMany();

    if (bancas.length == 0) {
      throw new ForbiddenException('Nenhuma orientação cadastrada.');
    }

    return bancas;
  }

  async findOne(id: string) {
    const banca = await this.prisma.banca.findUnique({
      where: {
        id_banca: id
      }
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
