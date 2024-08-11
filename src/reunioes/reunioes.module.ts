import { Module } from '@nestjs/common';
import { ReunioesService } from './reunioes.service';
import { ReunioesController } from './reunioes.controller';

@Module({
  providers: [ReunioesService],
  controllers: [ReunioesController]
})
export class ReunioesModule {}
