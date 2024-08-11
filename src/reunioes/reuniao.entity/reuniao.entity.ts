import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Aluno } from 'src/alunos/aluno.entity/aluno.entity';
import { Professor } from 'src/professores/professor.entity/professor.entity';

@Entity('reunioes')
export class Reuniao {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Aluno)
  aluno: Aluno;

  @ManyToOne(() => Professor)
  professor: Professor;

  @Column('datetime')
  data: Date;

  @Column()
  documento: string; // caminho do arquivo
}
