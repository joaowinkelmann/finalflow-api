import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async sendMail(@Body() createMailDto: CreateMailDto): Promise<{ message: string }> {
    const message = await this.mailService.sendEmail(createMailDto);
    return { message: message ? 'Email enviado com sucesso' : 'Erro ao enviar email' };
  }
}