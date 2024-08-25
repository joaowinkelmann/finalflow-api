import { Module } from '@nestjs/common';
import { AlunosModule } from './alunos/alunos.module';
import { PrismaService } from '../prisma/prisma.service';
import { CursosModule } from './cursos/cursos.module';
import { ProfessoresModule } from './professores/professores.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { MailModule } from './mail/mail.module';
import { CoordenadorModule } from './coordenador/coordenador.module';

@Module({
  imports: [AlunosModule, UsuariosModule, CursosModule, ProfessoresModule, AuthModule, MailModule, CoordenadorModule],
  providers: [
    PrismaService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard
    }
  ],
})
export class AppModule { }