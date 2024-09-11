import { NotAcceptableException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateEntregaDto } from './dto/create-entrega.dto';
import { UpdateEntregaDto } from './dto/update-entrega.dto';
import { PrismaService } from 'prisma/prisma.service';
import { NivelAcesso } from '@prisma/client';

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
    const entregas = await this.prisma.entrega.findMany({
      select: {
        id_entrega: true,
        data_envio: true,
        idaluno: true,
        idorientacao: true,
        idprazo: true
      }
    });

    if (entregas.length == 0) {
      throw new NotAcceptableException('Nenhuma entrega cadastrada até o momento');
    }

    return entregas;
  }

  async findOne(id: string) {
    const findOneEntrega = await this.prisma.entrega.findFirst({
      where: {
        id_entrega: id
      }
    })

    if (findOneEntrega == null) {
      throw new NotAcceptableException('Entrega não encontrada, informe id valido');
    }

    return findOneEntrega;
  }

  async getStudentSubmissions(idusuario: string) {
    const professor = await this.prisma.professor.findUnique({
      where: {
        idusuario: idusuario
      }
    });
    if (!professor) {
      throw new NotFoundException('Usuário não é um professor');
    }

    return await this.prisma.entrega.findMany({
      where: {
        orientacao: {
          idprofessor: professor.id_professor
        }
      },
      select: {
        id_entrega: true,
        prazo_tipo: true,
        data_envio: true,
        idaluno: true,
        idorientacao: true,
        idprazo: true,
      }
      // include: {
      //   aluno: true
      // }
    });
  }

  async getMySubmissions(idusuario: string) {
    const aluno = await this.prisma.aluno.findUnique({
      where: {
        idusuario: idusuario
      }
    });
    if (!aluno) {
      throw new NotFoundException("Usuário não é um aluno");
    }

    return await this.prisma.entrega.findMany({
      where: {
        idaluno: aluno.id_aluno
      },
      select: {
        id_entrega: true,
        prazo_tipo: true,
        data_envio: true,
        idaluno: true,
        idorientacao: true,
        idprazo: true,
      }
    });
  }

  // pega o arquivo da entrega em um request separado, pra nao ficar absurdo
  async getFileFromEntrega(idusuario: string, nivel_acesso: NivelAcesso, identrega: string) {
    let roleFilter = {};
  
    if (nivel_acesso === NivelAcesso.professor) {
      const professor = await this.prisma.professor.findUnique({
        where: {
          idusuario: idusuario
        }
      });
      if (!professor) {
        throw new UnauthorizedException('Usuário não é um professor vinculado.');
      }

      roleFilter = {
        orientacao: {
          idprofessor: professor.id_professor
        }
      };
    } else if (nivel_acesso === NivelAcesso.aluno) {
      const aluno = await this.prisma.aluno.findUnique({
        where: {
          idusuario: idusuario
        }
      });
      if (!aluno) {
        throw new UnauthorizedException('Usuário não é um aluno vinculado.');
      }

      roleFilter = {
        orientacao: {
          idaluno: aluno.id_aluno
        }
      };
    } else if ((nivel_acesso !== NivelAcesso.coordenador)) {
      // se for coordena, azar e acessa kkk
      // verfificar se nao vale a pena verificar que o cara é coordena mesmo
      throw new UnauthorizedException('Usuário não tem permissão para acessar esse arquivo.');
    }
  
    const fileEntrega = await this.prisma.entrega.findFirst({
      where: {
        id_entrega: identrega,
        ...roleFilter
      },
      select: {
        arquivo: true
      }
    });
  
    if (!fileEntrega) {
      throw new NotFoundException('Arquivo não encontrado. Verifique se a entrega está vinculada à sua orientação.');
    }
  
    return fileEntrega;
  }

  async update(id: string, updateEntregasDto: UpdateEntregaDto) {
    return await this.prisma.entrega.update({
      where: {
        id_entrega: id
      },
      data: updateEntregasDto
    }).catch((error) => {
      console.log(error);
      throw new NotFoundException('Entrega não encontrada');
    });
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
