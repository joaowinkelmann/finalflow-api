import { Module } from '@nestjs/common';
import { NotasService } from './notas.service';
import { NotasController } from './notas.controller';

@Module({
  providers: [NotasService],
  controllers: [NotasController]
})
export class NotasModule {}
