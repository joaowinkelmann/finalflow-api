import { NotAcceptableException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  async findAll() {
    const entregas = await this.prisma.entrega.findMany();

    if(entregas.length == 0){
      throw new NotAcceptableException('Nenhuma entrega cadastrada até o momento!');
    }

    return entregas;
  }

  async findOne(id: string) {
    const findOneEntrega = await this.prisma.entrega.findFirst({
      where: {
        id_entrega: id
      }
    })

    if(findOneEntrega == null){
      throw new NotAcceptableException('Entrega não encontrada, informe id valido');
    }

    return findOneEntrega;
  }

  update(id: string, updateEntregasDto: UpdateEntregaDto) {
    return `This action updates a #${id} entrega`;
  }

  async remove(id: string) {
    try {
      const deleteEntrega = await this.prisma.entrega.delete({
        where: {
          id_entrega: id,
        },
      });
    
      return {
        message: 'Sucesso ao excluir!',
        entrega: deleteEntrega,
      };
    } catch (error) {
      if (error.code === 'P2025') { 
        throw new NotAcceptableException('Não foi possível excluir a entrega, por favor informe um id válido');
      } else {
        throw error; 
      }
    }    
  }
}
