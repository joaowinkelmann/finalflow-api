import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCronogramaDto } from './dto/create-cronograma.dto';
import { UpdateCronogramaDto } from './dto/update-cronograma.dto';
import { PrismaService } from 'prisma/prisma.service';
import { CoordenadoresService } from '../coordenadores/coordenadores.service';

@Injectable()
export class CronogramasService {
  constructor(private prisma: PrismaService, private coordenadoresService: CoordenadoresService) { }
  async create(createCronogramaDto: CreateCronogramaDto, idusuario: string) {

    // vamos pegar o idcoordenador da tabela de coordenador
    let idusuario_coordenador = await this.coordenadoresService.findOne(idusuario);
    if (!idusuario_coordenador) {
      throw new NotFoundException('Coordenador não encontrado');
    }

    return this.prisma.cronograma.create({
      data: {
        idcoordenador: idusuario_coordenador.id_coordenador,
        descricao: createCronogramaDto.descricao,
        data_inicio: new Date(createCronogramaDto.dataInicio),
        data_fim: new Date(createCronogramaDto.dataFim),
      }
    });
  }

  async findAll() {
    return await this.prisma.cronograma.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.cronograma.findUnique({
      where: {
        id_cronograma: id,
      },
    }).catch((error) => {
      console.log(error);
      throw new NotFoundException("Cronograma não encontrado");
    });
  }

  async update(id: string, updateCronogramaDto: UpdateCronogramaDto) {
    return await this.prisma.cronograma.update({
      where: { id_cronograma: id },
      data: updateCronogramaDto,
    }).catch((error) => {
      console.log(error);
      throw new NotFoundException("Cronograma não encontrado");
    });
  }

  async remove(id: string) {
    return await this.prisma.cronograma.delete({
      where: { id_cronograma: id },
    }).catch((error) => {
      console.log(error);
      if (error.code === 'P2025') {
        throw new NotFoundException("Cronograma não encontrado");
      } else if (error.code === 'P2004' || error.code === 'P2002' || error.code === 'P2003') {
        throw new ConflictException("Cronograma não pode ser removido, pois está asssociado à orientações ou prazos ativos.");
      }
    }).then(() => {
      return "Cronograma removido com sucesso";
    });
  }
}
