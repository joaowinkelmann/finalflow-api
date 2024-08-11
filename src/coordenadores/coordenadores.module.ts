import { Module } from '@nestjs/common';
import { CoordenadoresService } from './coordenadores.service';
import { CoordenadoresController } from './coordenadores.controller';

@Module({
  providers: [CoordenadoresService],
  controllers: [CoordenadoresController]
})
export class CoordenadoresModule {}
