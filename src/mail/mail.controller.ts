import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateMailDto } from './dto/create-mail.dto';

@Controller('mail')
export class MailController {
    constructor(
        private readonly MailService: MailService,
        private readonly mailerService: MailerService
      ) { }
    
      @Post()
      async sendMail(@Body() CreateMailDto: CreateMailDto): Promise<{ message: string }> {
        const { to, subject, text } = CreateMailDto;
  
          await this.mailerService.sendMail({
              to,
              subject,
              text
          });
  
          return { message: 'Email enviado!' };
      }
}
