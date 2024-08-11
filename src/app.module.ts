import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunosModule } from './alunos/alunos.module';
import { ProfessoresModule } from './professores/professores.module';
import { CoordenadoresModule } from './coordenadores/coordenadores.module';
import { BancasModule } from './bancas/bancas.module';
import { CronogramasModule } from './cronogramas/cronogramas.module';
import { NotasModule } from './notas/notas.module';
import { ReunioesModule } from './reunioes/reunioes.module';
import { AlertasModule } from './alertas/alertas.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '168.138.136.211',
      port: 5432,
      username: 'user_app_kurt',
      password: '9nwui7yt9iokd7m6',
      database: 'db_kurt',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AlunosModule,
    ProfessoresModule,
    CoordenadoresModule,
    BancasModule,
    CronogramasModule,
    NotasModule,
    ReunioesModule,
    AlertasModule,
    // Outros módulos aqui
  ],
})
export class AppModule {}
