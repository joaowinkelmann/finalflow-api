import { Module } from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { AlunosController } from './alunos.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AlunosController],
  providers: [AlunosService, PrismaService],
})
export class AlunosModule {}