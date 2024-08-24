import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MailService {
    constructor(private prisma: PrismaService) {}

    sendEmail(): string {
        // Aqui você colocaria a lógica para enviar o email
        return 'Email enviado!';
    }
}
