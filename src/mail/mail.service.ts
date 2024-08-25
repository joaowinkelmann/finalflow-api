import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class MailService {
  constructor(
    private prisma: PrismaService,
    private readonly mailerService: MailerService
  ) {}

  async sendEmail(createMailDto: CreateMailDto): Promise<boolean> {
    const { to, subject, text, template, context } = createMailDto;

    return await this.mailerService.sendMail({
      to,
      subject,
      text,
      template,
      context, // @todo - ta quebrado isso aqui ainda
    }).then((info: SentMessageInfo) => {
      // console.log(info);
      return true;
    }).catch((error) => {
      console.error(error);
      return false;
    });
  }
}