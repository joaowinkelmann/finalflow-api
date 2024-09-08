import { Module } from '@nestjs/common';
import { PrazosService } from './prazos.service';
import { PrazosController } from './prazos.controller';
import { PrismaService } from 'prisma/prisma.service';
import { AlertasService } from 'src/alertas/alertas.service';

@Module({
  controllers: [PrazosController],
  providers: [PrazosService, AlertasService, PrismaService],
})
export class PrazosModule {}
