import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateAlertaDto } from './dto/create-alerta.dto';
import { UpdateAlertaDto } from './dto/update-alerta.dto';
import { PrismaService } from 'prisma/prisma.service';
// import { MailService } from 'src/mail/mail.service';
import { MailerService } from "@nestjs-modules/mailer";
import { StatusOrientacao } from '@prisma/client';

@Injectable()
export class AlertasService {
  constructor(private readonly prisma: PrismaService, private readonly mailService: MailerService) { }
  async create(createAlertaDto: CreateAlertaDto
  ) {
    return await this.prisma.alerta.create({
      data: createAlertaDto,
    }).then((data) => {
      // console.log(data);
    });
  }

  // async createMany(alerts: { prazoId: string; assunto: string; mensagem: string; dataEnvio: Date; jaEnviado: boolean; idUsuario: string }[]) {
  async createMany(alerts: CreateAlertaDto[]) {
    // throw new Error('Method not implemented.');
    return await this.prisma.alerta.createMany({
      data: alerts,
    });
  }

  findAll() {
    return this.prisma.alerta.findMany();
  }

  findOne(id: string) {
    return this.prisma.alerta.findUnique({
      where: { id_alerta: id },
    });
  }

  async update(id: string, updateAlertaDto: UpdateAlertaDto) {
    return await this.prisma.alerta.update({
      where: { id_alerta: id },
      data: updateAlertaDto,
    });
  }

  async remove(id: string) {
    const temAlerta = await this.prisma.alerta.findFirst({
      where: {
        id_alerta: id
      }
    })
    if (temAlerta == null) {
      throw new NotAcceptableException('Por favor informe um id válido');
    }

    await this.prisma.alerta.delete({
      where: {
        id_alerta: id
      }
    });

    return {
      message: "Alerta removido com sucesso"
    };
  }

  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  // @Cron(CronExpression.EVERY_10_SECONDS)
  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    console.log('Running scheduled task to process Alertas');

    // pegar os alertas pendentes do banco
    const alertas = await this.prisma.alerta.findMany({
      where: {
        data_envio: { lte: new Date() }, // lte: less than or equal (ja passou)
        ja_enviado: false,
      },
      include: {
        Usuario: true,
        Prazo: true,
      },
    });

    // envia cada alerta
    for (const alerta of alertas) {
      // Enviar email
      let foiEnviado = await this.mailService.sendMail({
        to: alerta.Usuario.email,
        subject: alerta.assunto,
        text: alerta.mensagem,
        template: "alert",
        context: {
          nome: alerta.Usuario.nome,
          data: alerta.data_envio,
          mensagem: alerta.mensagem,
        },
      });

      if (foiEnviado) {
        // Atualizar o alerta como jaEnviado
        await this.prisma.alerta.update({
          where: { id_alerta: alerta.id_alerta },
          data: { ja_enviado: true },
        });
      }
    }
  }

  // varre os Prazos de cada Orientação e gera os Alertas de Prazo para submeter as Entregas
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async generateAlertasforPrazoEntrega() {
    console.info('=> Executando rotina para gerar alertas de prazo de entrega...');

    // get current time
    const start = process.hrtime();

    const cronogramas = await this.prisma.cronograma.findMany({
      where: {
        data_inicio: { lte: new Date() },
        data_fim: { gte: new Date() },
      }
    });

    for (const cronograma of cronogramas) {
      const orientacoes = await this.prisma.orientacao.findMany({
        where: {
          idcronograma: cronograma.id_cronograma,
          status: StatusOrientacao.EmAndamento
        },
        include: {
          Aluno: {
            select: {
              idusuario: true,
            }
          }
        }
      });

      const prazos = await this.prisma.prazo.findMany({
        where: {
          idcronograma: cronograma.id_cronograma,
        }
      });

      for (const orientacao of orientacoes) {
        for (const prazo of prazos) {
          const existingAlerts = await this.prisma.alerta.findMany({
            where: {
              idprazo: prazo.id_prazo,
              idusuario: orientacao.Aluno.idusuario,
            }
          });

          const alertIntervals = [30, 20, 10, 5, 3, 1];

          const unscheduledIntervals = alertIntervals.filter(interval => {
            const alertDate = new Date(prazo.data_entrega);
            alertDate.setDate(alertDate.getDate() - interval);

            return !existingAlerts.some(alert =>
              alert.data_envio.toISOString() === alertDate.toISOString()
            );
          });

          const newAlerts = unscheduledIntervals.map(interval => {
            const alertDate = new Date(prazo.data_entrega);
            alertDate.setDate(alertDate.getDate() - interval);

            return {
              idprazo: prazo.id_prazo,
              idusuario: orientacao.Aluno.idusuario,
              assunto: `Lembrete: ${interval} dias até o prazo para ${prazo.dscprazo || prazo.prazo_tipo}`,
              mensagem: `Você tem ${interval} dias para entregar ${prazo.dscprazo || prazo.prazo_tipo}.`,
              data_envio: alertDate,
              ja_enviado: false,
            };
          });

          if (newAlerts.length > 0) {
            await this.prisma.alerta.createMany({
              data: newAlerts,
            });
          }
        }
      }
    }

    const end = process.hrtime(start);
    console.info('### generateAlertasforPrazoEntrega executado em %ds %dms', end[0], end[1] / 1000000);
  }

  // varre as reuniões criadas e busca se tem alguma ainda que não foi agendada para ser enviada
  // essa task precisa gerar alertas tanto para o professor quanto para o aluno
  // também irá fazer up (upsert) no banco de dados, caso a reunião tenha sido remarcada
  // caso a reunião tenha sido removida, os alertas serão removidos
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async generateAlertasforReunioes() {
    console.log('=> Executando rotina para gerar alertas de reuniões...');
    const start = process.hrtime();

    const daysBefore = [1, 3, 5, 10];

    // Passo 1: Pega as reuniões dos próximos 10 dias
    const reunioes = await this.prisma.reuniao.findMany({
      where: {
        data_reuniao: {
          gte: new Date(),
          lte: new Date(new Date().setDate(new Date().getDate() + 10))
        }
      },
      include: {
        Orientacao: {
          include: {
            Aluno: true,
            Professor: true
          }
        }
      }
    });

    // Passo 2: Pega os Alertas dessas Reuniões
    const allAlertas = await this.prisma.alerta.findMany({
      where: {
        OR: reunioes.map(reuniao => ({ idreuniao: reuniao.id_reuniao }))
      }
    });

    const existingAlertDates = new Set(allAlertas.map(alerta => alerta.data_envio.getTime()));

    // Passo 3: Itera sobre as Reuniões e monta os Alertas necessários
    for (const reuniao of reunioes) {
      const alertsToCreate: {
        idreuniao: string;
        idusuario: string;
        assunto: string;
        mensagem: string;
        data_envio: Date;
      }[] = [];

      const alertDates = daysBefore.map(days => {
        const alertaDate = new Date(reuniao.data_reuniao);
        alertaDate.setDate(alertaDate.getDate() - days);
        return alertaDate;
      });

      for (let i = 0; i < daysBefore.length; i++) {
        const alertaDate = alertDates[i];

        if (!existingAlertDates.has(alertaDate.getTime())) {
          alertsToCreate.push({
            idreuniao: reuniao.id_reuniao,
            idusuario: reuniao.Orientacao.Aluno.idusuario,
            assunto: `Lembrete de reunião - ${daysBefore[i]} dias antes`,
            mensagem: `Você tem uma reunião marcada para ${reuniao.data_reuniao}.`,
            data_envio: alertaDate
          });

          alertsToCreate.push({
            idreuniao: reuniao.id_reuniao,
            idusuario: reuniao.Orientacao.Professor.idusuario,
            assunto: `Lembrete de reunião - ${daysBefore[i]} dias antes`,
            mensagem: `Você tem uma reunião marcada para ${reuniao.data_reuniao}.`,
            data_envio: alertaDate
          });
        }
      }

      // Passo 4: Se existirem Alertas a serem criados, lança no banco
      if (alertsToCreate.length > 0) {
        await this.prisma.alerta.createMany({
          data: alertsToCreate
        });
      }
    }

    // Passo 5: Sincroniza os Alertas com as Reuniões, removendo os Alertas de Reuniões que não existem mais ou foram remarcadas
    const existingReuniaoIds = new Set(reunioes.map(reuniao => reuniao.id_reuniao));
    const alertsToRemove = allAlertas.filter(alerta => alerta.idreuniao && !existingReuniaoIds.has(alerta.idreuniao));

    if (alertsToRemove.length > 0) {
      await this.prisma.alerta.deleteMany({
        where: {
          id_alerta: { in: alertsToRemove.map(alerta => alerta.id_alerta) }
        }
      });
    }

    const end = process.hrtime(start);
    console.info('### generateAlertasforReunioes executado em %ds %dms', end[0], end[1] / 1000000);
  }
}