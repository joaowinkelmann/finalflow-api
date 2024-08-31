import { Module } from '@nestjs/common';
import { BancasService } from './bancas.service';
import { BancasController } from './bancas.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [BancasController],
  providers: [BancasService, PrismaService],
})
export class BancasModule {}
