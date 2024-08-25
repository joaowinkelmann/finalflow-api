import { Module } from '@nestjs/common';
import { CoordenadorController } from './coordenador.controller';
import { CoordenadorService } from './coordenador.service';

@Module({
  controllers: [CoordenadorController],
  providers: [CoordenadorService]
})
export class CoordenadorModule {}
