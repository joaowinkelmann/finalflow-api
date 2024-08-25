import { Module } from '@nestjs/common';
import { CronogramasService } from './cronogramas.service';
import { CronogramasController } from './cronogramas.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [CronogramasController],
  providers: [CronogramasService, PrismaService],
})
export class CronogramasModule {}
