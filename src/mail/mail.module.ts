import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Carrega as variáveis de ambiente
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('SMTP_HOST'),
          port: configService.get<number>('SMTP_PORT'),
          secure: configService.get<boolean>('SMTP_SECURE'), // true para 465, false para 587
          auth: {
            user: configService.get<string>('SMTP_USER'),
            pass: configService.get<string>('SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: configService.get<string>('SMTP_FROM'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MailController],
  providers: [MailService, PrismaService],
})
export class MailModule {}
