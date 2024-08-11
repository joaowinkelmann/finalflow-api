import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunosService } from './alunos.service';
import { AlunosController } from './alunos.controller';
import { Aluno } from './aluno.entity/aluno.entity';
import { Professor } from '../professores/professor.entity/professor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aluno, Professor])],  // Import both Aluno and Professor
  providers: [AlunosService],
  controllers: [AlunosController],
})
export class AlunosModule {}