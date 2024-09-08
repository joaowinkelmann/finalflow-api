import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateEntregaDto } from './dto/create-entrega.dto';
import { UpdateEntregaDto } from './dto/update-entrega.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class EntregasService {
  constructor(private prisma: PrismaService) { }
  async submit(createEntregasDto: CreateEntregaDto, idusuario: string) {

    const aluno = await this.prisma.aluno.findUnique({
      where: {
        idusuario: idusuario
      },
    });
    if (!aluno) {
      throw new UnauthorizedException('Usuário não é um aluno'); // @todo - verificar se unauthorized faz sentido
    }

    const prazo = await this.prisma.prazo.findUnique({
      where: {
        id_prazo: createEntregasDto.idprazo
      }
    });
    if (!prazo) {
      throw new NotFoundException('Prazo não encontrado');
    }

    const data_envio = new Date();

    const entrega = await this.prisma.entrega.create({
      data: {
        ...createEntregasDto,
        data_envio: data_envio,
        idaluno: aluno.id_aluno,
        prazo_tipo: prazo.prazo_tipo,
        }
    });
  }

  findAll() {
    return `This action returns all entrega`;
  }

  findOne(id: string) {
    return `This action returns a #${id} entrega`;
  }

  update(id: string, updateEntregasDto: UpdateEntregaDto) {
    return `This action updates a #${id} entrega`;
  }

  remove(id: string) {
    return `This action removes a #${id} entrega`;
  }
}
