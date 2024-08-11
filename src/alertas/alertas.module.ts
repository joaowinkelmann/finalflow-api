import { Module } from '@nestjs/common';
import { AlertasService } from './alertas.service';
import { AlertasController } from './alertas.controller';

@Module({
  providers: [AlertasService],
  controllers: [AlertasController]
})
export class AlertasModule {}
