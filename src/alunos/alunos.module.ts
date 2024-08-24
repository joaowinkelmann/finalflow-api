import { Module } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { AlunosController } from './alunos.controller';
import { AlunosService } from './alunos.service';

@Module({
  controllers: [AlunosController],
  providers: [AlunosService, PrismaService],
})
export class AlunosModule {}
