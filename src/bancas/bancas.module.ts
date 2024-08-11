import { Module } from '@nestjs/common';
import { BancasService } from './bancas.service';
import { BancasController } from './bancas.controller';

@Module({
  providers: [BancasService],
  controllers: [BancasController]
})
export class BancasModule {}
