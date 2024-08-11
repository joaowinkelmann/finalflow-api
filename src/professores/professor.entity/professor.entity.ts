import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Aluno } from 'src/alunos/aluno.entity/aluno.entity';

@Entity('professores')
export class Professor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  especialidade: string;

  @OneToMany(() => Aluno, (aluno) => aluno.orientador)
  alunos: Aluno[];
}
