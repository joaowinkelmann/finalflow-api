import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Aluno } from 'src/alunos/aluno.entity/aluno.entity';
import { Professor } from 'src/professores/professor.entity/professor.entity';

@Entity('bancas')
export class Banca {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Aluno)
  aluno: Aluno;

  @ManyToOne(() => Professor)
  professor1: Professor;

  @ManyToOne(() => Professor)
  professor2: Professor;
}
