import { Module } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { AlunosController } from './alunos.controller';
import { AlunosService } from './alunos.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Module({
  controllers: [AlunosController],
  providers: [AlunosService, UsuariosService, PrismaService],
})
export class AlunosModule {}
