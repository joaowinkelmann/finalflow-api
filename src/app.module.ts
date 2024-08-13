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
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
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
