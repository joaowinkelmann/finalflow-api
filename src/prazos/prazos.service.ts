import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreatePrazoDto } from './dto/create-prazo.dto';
import { UpdatePrazoDto } from './dto/update-prazo.dto';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class PrazosService {
  constructor(private prisma: PrismaService) { }
  async create(createPrazoDto: CreatePrazoDto) {

    // verificar se o cronograma existe mesmo
    const cronograma = await this.prisma.cronograma.findUnique({
      where: {
        id_cronograma: createPrazoDto.idcronograma,
      },
    });

    if (!cronograma) {
      throw new NotFoundException('Cronograma não encontrado');
    }

    return await this.prisma.prazo.create({
      data: createPrazoDto,
    }).catch((err) => {
      if (err.code === 'P2002') {
        throw new ConflictException('Prazo já cadastrado');
      } else {
        console.log(err);
        throw new UnprocessableEntityException('Erro ao cadastrar prazo');
      }
    });
  }

  async findAll() {
    return await this.prisma.prazo.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.prazo.findUnique({
      where: {
        id_prazo: id,
      },
    }).catch((error) => {
      console.log(error);
      throw new NotFoundException("Prazo não encontrado");
    });
  }

  async update(id: string, updatePrazoDto: UpdatePrazoDto) {

    // necessário fazer a validação da data, pois caso o prazo seja alterado, tem que atualizar as Entregas e Avaliações das Orientações, assim como as datas de envio de Alertas, alterar para o passado da xabu 💀💀💀

    return await this.prisma.prazo.update({
      where: {
        id_prazo: id,
      },
      data: updatePrazoDto,
    }).catch((error) => {
      console.log(error);
      if (error.code === 'P2003' || error.code === 'P2002' || error.code === 'P2004') {
        throw new ConflictException("Esse prazo não pode ser atualizado, existem entregas ou avaliações associadas a ele");
      }
      throw new UnprocessableEntityException("Erro ao atualizar prazo");
    });
  }

  async remove(id: string) {
    return await this.prisma.prazo.delete({
      where: {
        id_prazo: id,
      },
    }).catch((error) => {
      console.log(error);
      if (error.code === 'P2003' || error.code === 'P2002' || error.code === 'P2004') {
        throw new ConflictException("Esse prazo não pode ser deletado, existem entregas ou avaliações associadas a ele");
      }
      throw new UnprocessableEntityException("Erro ao deletar prazo.");
    });
  }

  async prazoCronograma(id: string) {
    return await this.prisma.prazo.findMany({
      where: {
        idcronograma: id,
      },
    }).catch((error) => {
      console.log(error);
      throw new NotFoundException('Prazos não encontrados');
    });
  }
}
