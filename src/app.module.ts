import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { CursosModule } from './cursos/cursos.module';
import { CoordenadoresModule } from './coordenadores/coordenadores.module';
import { ProfessoresModule } from './professores/professores.module';
import { AlunosModule } from './alunos/alunos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { MailModule } from './mail/mail.module';
import { AlertasModule } from './alertas/alertas.module';
import { PrazosModule } from './prazos/prazos.module';
import { CronogramasModule } from './cronogramas/cronogramas.module';
import { OrientacoesModule } from './orientacoes/orientacoes.module';

@Module({
  imports: [AlunosModule, UsuariosModule, CursosModule, ProfessoresModule, AuthModule, MailModule, CoordenadoresModule, ScheduleModule.forRoot(), AlertasModule, PrazosModule, CronogramasModule, OrientacoesModule],
  providers: [
    PrismaService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard
    }
  ],
})
export class AppModule { }