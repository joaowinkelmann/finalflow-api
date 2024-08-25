import { Module } from '@nestjs/common';
import { ReunioesService } from './reunioes.service';
import { ReunioesController } from './reunioes.controller';

@Module({
  controllers: [ReunioesController],
  providers: [ReunioesService],
})
export class ReunioesModule {}
