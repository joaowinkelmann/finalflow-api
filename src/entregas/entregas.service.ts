import { NotAcceptableException, Injectable, NotFoundException, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { CreateEntregaDto } from './dto/create-entrega.dto';
import { UpdateEntregaDto } from './dto/update-entrega.dto';
import { PrismaService } from 'prisma/prisma.service';
import { NivelAcesso, StatusEntrega } from '@prisma/client';
import { TipoPrazo } from '@prisma/client';

@Injectable()
export class EntregasService {
  constructor(private prisma: PrismaService) { }
  async submit(createEntregaDto: CreateEntregaDto, idusuario: string) {

    const aluno = await this.prisma.aluno.findUnique({
      where: {
        idusuario: idusuario
      },
    });
    if (!aluno) {
      throw new UnauthorizedException('Usuário não é um aluno'); // @todo - verificar se unauthorized faz sentido
    }

    const cronograma_from_orientacao = await this.prisma.orientacao.findFirst({
      where: {
        id_orientacao: createEntregaDto.idorientacao
      },
      select: {
        idcronograma: true
      }
    });
    if (!cronograma_from_orientacao) {
      throw new NotFoundException('Orientação não encontrada');
    }

    const idcronograma = cronograma_from_orientacao.idcronograma;

    const prazo = await this.prisma.prazo.findUnique({
      where: {
        idcronograma_prazo_tipo: {
          idcronograma: idcronograma,
          prazo_tipo: createEntregaDto.prazo_tipo
        },
      }
    });
    if (!prazo) {
      throw new NotFoundException('Prazo não encontrado');
    }

    // verificação de ordem de entrega
    // pode ser que uma das entregas seja para EntregaTC, mas pode ser
    // que o cara nem a Proposta tenha feito ainda
    await this.validateSubmissionOrder(aluno.id_aluno, prazo.prazo_tipo, createEntregaDto.idorientacao);

    const data_envio = new Date();

    try {
      await this.prisma.entrega.upsert({
        where: {
          idaluno_idprazo_idorientacao_prazo_tipo: {
            idaluno: aluno.id_aluno,
            idprazo: prazo.id_prazo,
            idorientacao: createEntregaDto.idorientacao,
            prazo_tipo: prazo.prazo_tipo
          }
        },
        update: {
          arquivo: createEntregaDto.arquivo,
          data_envio: data_envio,
          status: StatusEntrega.AguardandoAvaliacao
        },
        create: {
          ...createEntregaDto,
          data_envio: data_envio,
          idaluno: aluno.id_aluno,
          idprazo: prazo.id_prazo
        }
      });

      return {
        message: 'Entrega criada com sucesso',
        data: {
          idaluno: aluno.id_aluno,
          idorientacao: createEntregaDto.idorientacao,
          prazo_tipo: createEntregaDto.prazo_tipo,
          data_envio: data_envio
        }
      }

    } catch (error) {
      console.log(error);
      if (error.code === 'P2004' || error.code === 'P2002' || error.code === 'P2003') {
        throw new ConflictException('Entrega já realizada');
      }
      throw new NotAcceptableException('Erro ao criar entrega');
    }
  }

  /**
   * Força o cara a entregar as coisas como tudo deve ser
   * 
   * @param idaluno
   * @param incomingPrazoTipo - Tipo de prazo que o aluno está tentando entregar
   * @param idorientacao
   * 
   * @throws {BadRequestException} Se não achou o tipo de prazo
   * @throws {BadRequestException} Se a ordem de entrega não foi seguida
   */
  private async validateSubmissionOrder(idaluno: string, incomingPrazoTipo: TipoPrazo, idorientacao: string) {
    const submissionOrder = Object.values(TipoPrazo);
    const prazoTipoIndex = submissionOrder.indexOf(incomingPrazoTipo);

    if (prazoTipoIndex === -1) {
      throw new BadRequestException('Tipo de prazo inválido');
    } else {
      const previousSubmissions = await this.prisma.entrega.findMany({
        where: {
          idaluno: idaluno,
          idorientacao: idorientacao,
          prazo_tipo: {
            in: submissionOrder.slice(0, prazoTipoIndex)
          },
          // NOT: {
          //   arquivo: null // @todo - verificar se isso é necessário, tamo olhando pelos stauts agora
          // },
          status: {
            in: [StatusEntrega.Avaliado, StatusEntrega.AguardandoAvaliacao]
          }
        },
        select: {
          prazo_tipo: true
        }
      });

      const submittedTypes = new Set(previousSubmissions.map(sub => sub.prazo_tipo));

      for (let i = 0; i < prazoTipoIndex; i++) {
        const requiredPrazoTipo = submissionOrder[i];
        if (!submittedTypes.has(requiredPrazoTipo)) {
          throw new BadRequestException(`Você precisa enviar ${requiredPrazoTipo} antes de enviar ${incomingPrazoTipo}`);
        }
      }
    }
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
        idusuario: idusuario,
      },
    });

    if (!professor) {
      throw new NotFoundException('Usuário não é um professor');
    }

    const orientacoes = await this.prisma.orientacao.findMany({
      where: {
        idprofessor: professor.id_professor,
      },
      include: {
        Aluno: {
          include: {
            usuario: {
              select: {
                nome: true
              }
            }
          },
        }
      },
    });

    const results = await Promise.all(orientacoes.map(async (orientacao) => {
      const entregas = await this.prisma.entrega.findMany({
        where: {
          idorientacao: orientacao.id_orientacao,
        },
        include: {
          Avaliacao: true,
        }
      });

      return {
        orientacao: orientacao,
        entregas: entregas,
      };
    }));

    return results;
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
      include: {
        orientacao: {
          include: {
            Professor: {
              select: {
                usuario: {
                  select: {
                    nome: true
                  }
                }
              }
            }
          }
        },
        Avaliacao: true
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