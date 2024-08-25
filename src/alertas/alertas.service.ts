import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateAlertaDto } from './dto/create-alerta.dto';
import { UpdateAlertaDto } from './dto/update-alerta.dto';
import { PrismaService } from 'prisma/prisma.service';
// import { MailService } from 'src/mail/mail.service';
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class AlertasService {
  constructor(private readonly prisma: PrismaService, private readonly mailService: MailerService) {}
  create(createAlertaDto: CreateAlertaDto
  ) {
    // return 'This action adds a new alerta';
    // add a new alerta to the database
    return this.prisma.alerta.create({
      data: createAlertaDto,
    }).then((data) => {
      // console.log(data);
    });
  }

  findAll() {
    // return `This action returns all alertas`;
    return this.prisma.alerta.findMany();
  }

  findOne(id: string) {
    // return `This action returns a #${id} alerta`;
    return this.prisma.alerta.findUnique({
      where: { id_alerta: id },
    });
  }

  update(id: string, updateAlertaDto: UpdateAlertaDto) {
    return `This action updates a #${id} alerta`;
  }

  remove(id: string) {
    return `This action removes a #${id} alerta`;
  }

  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  // @Cron(CronExpression.EVERY_10_SECONDS)
  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    console.log('Running scheduled task to process Alertas');

    // pegar os alertas pendentes do banco
    const alertas = await this.prisma.alerta.findMany({
      where: {
        dataAlerta: { lte: new Date() }, // lte: less than or equal (ja passou)
        jaEnviado: false,
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

        // to: alerta.Usuario.email,
        // subject: `Primeiro Acesso Ao Site: ${alerta.Usuario.nome}`,
        // template: "sign-up",
        // context: {
        //   name: alerta.Usuario.nome,
        //   message: alerta.mensagem,
        // },

        to: alerta.Usuario.email,
        subject: alerta.assunto,
        text: alerta.mensagem,
        template: "alert",
        context: {
          nome: alerta.Usuario.nome,
          data: alerta.Prazo.dataLimite,
          mensagem: alerta.mensagem,
        },
      });

      if (foiEnviado) {
        // Atualizar o alerta como jaEnviado
        await this.prisma.alerta.update({
          where: { id_alerta: alerta.id_alerta },
          data: { jaEnviado: true },
        });
      }
    }
  }
}
