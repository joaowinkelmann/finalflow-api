import { Module } from '@nestjs/common';
import { CronogramasService } from './cronogramas.service';
import { CronogramasController } from './cronogramas.controller';
import { PrismaService } from 'prisma/prisma.service';
import { CoordenadoresService } from '../coordenadores/coordenadores.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { ProfessoresService } from 'src/professores/professores.service';

@Module({
  controllers: [CronogramasController],
  providers: [CronogramasService, PrismaService, CoordenadoresService, ProfessoresService, UsuariosService],
})
export class CronogramasModule {}
