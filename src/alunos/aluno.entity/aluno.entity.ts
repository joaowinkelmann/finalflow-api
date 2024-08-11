import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Professor } from 'src/professores/professor.entity/professor.entity';

@Entity('alunos')
export class Aluno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  matricula: string;

  @ManyToOne(() => Professor, professor => professor.alunos)
  orientador: Professor;
}
