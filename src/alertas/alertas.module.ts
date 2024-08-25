import { Module } from '@nestjs/common';
import { AlertasService } from './alertas.service';
import { AlertasController } from './alertas.controller';
import { PrismaService } from 'prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [AlertasController],
  providers: [AlertasService, PrismaService, MailService],
})
export class AlertasModule {}
