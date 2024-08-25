import { Module } from '@nestjs/common';
import { OrientacoesService } from './orientacoes.service';
import { OrientacoesController } from './orientacoes.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [OrientacoesController],
  providers: [OrientacoesService, PrismaService],
})
export class OrientacoesModule {}
