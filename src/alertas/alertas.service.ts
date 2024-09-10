import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateAlertaDto } from './dto/create-alerta.dto';
import { UpdateAlertaDto } from './dto/update-alerta.dto';
import { PrismaService } from 'prisma/prisma.service';
// import { MailService } from 'src/mail/mail.service';
import { MailerService } from "@nestjs-modules/mailer";

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

  // busca se não entrou algum usuário em algum cronograma/orientação que precisa salvar os seus alertas no banco
  // @Cron(CronExpression.EVERY_10_SECONDS)
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async generateAlertasforOrientacoes() {
    console.log('Running scheduled task to process Orientacoes');

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
  }
}