import { Module } from '@nestjs/common';
import { ProfessoresService } from './professores.service';
import { ProfessoresController } from './professores.controller';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [ProfessoresController],
  providers: [ProfessoresService, UsuariosService, PrismaService]
})
export class ProfessoresModule {}
