import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Aluno } from 'src/alunos/aluno.entity/aluno.entity';
import { Professor } from 'src/professores/professor.entity/professor.entity';

@Entity('notas')
export class Nota {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Aluno)
  aluno: Aluno;

  @ManyToOne(() => Professor)
  professor: Professor;

  @Column({ type: 'enum', enum: ['Proposta', 'Reelaboracao Proposta', 'TC', 'Reelaboracao TC'] })
  tipo: string;

  @Column('float')
  nota: number;
}
