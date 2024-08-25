import { Module } from '@nestjs/common';
import { BancasService } from './bancas.service';
import { BancasController } from './bancas.controller';

@Module({
  controllers: [BancasController],
  providers: [BancasService],
})
export class BancasModule {}
