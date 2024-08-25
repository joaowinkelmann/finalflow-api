import { Module } from '@nestjs/common';
import { CoordenadoresController } from './coordenadores.controller';
import { CoordenadoresService } from './coordenadores.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [CoordenadoresController],
  providers: [CoordenadoresService, UsuariosService, PrismaService],
})
export class CoordenadoresModule {}
