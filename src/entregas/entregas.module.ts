import { Module } from '@nestjs/common';
import { EntregasService } from './entregas.service';
import { EntregasController } from './entregas.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [EntregasController],
  providers: [EntregasService, PrismaService],
})
export class EntregasModule {}
