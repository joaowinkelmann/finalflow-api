import { Module } from '@nestjs/common';
import { PrazosService } from './prazos.service';
import { PrazosController } from './prazos.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [PrazosController],
  providers: [PrazosService, PrismaService],
})
export class PrazosModule {}
