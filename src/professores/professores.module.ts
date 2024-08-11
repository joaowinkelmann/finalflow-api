import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessoresService } from './professores.service';
import { ProfessoresController } from './professores.controller';
import { Professor } from './professor.entity/professor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Professor])],
  providers: [ProfessoresService],
  controllers: [ProfessoresController],
})
export class ProfessoresModule {}