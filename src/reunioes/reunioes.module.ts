import { Module } from '@nestjs/common';
import { ReunioesService } from './reunioes.service';
import { ReunioesController } from './reunioes.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [ReunioesController],
  providers: [ReunioesService, PrismaService],
})
export class ReunioesModule {}
