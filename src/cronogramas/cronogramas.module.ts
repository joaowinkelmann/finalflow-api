import { Module } from '@nestjs/common';
import { CronogramasService } from './cronogramas.service';
import { CronogramasController } from './cronogramas.controller';

@Module({
  providers: [CronogramasService],
  controllers: [CronogramasController]
})
export class CronogramasModule {}
