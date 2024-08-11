import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Aluno } from 'src/alunos/aluno.entity/aluno.entity';

@Entity('alertas')
export class Alerta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Aluno)
  aluno: Aluno;

  @Column({ type: 'enum', enum: ['Entrega', 'Avaliacao'] })
  tipo: string;

  @Column()
  descricao: string;

  @Column('date')
  prazo: Date;
}
