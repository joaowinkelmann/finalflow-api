import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunosService } from './usuario.service';
import { AlunosController } from './usuario.controller';
import { Aluno } from './usuario.entity/usuario.entity';
import { Professor } from '../professores/professor.entity/professor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aluno, Professor])],  // Import both Aluno and Professor
  providers: [AlunosService],
  controllers: [AlunosController],
})
export class AlunosModule {}