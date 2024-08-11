import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Coordenador } from 'src/coordenadores/coordenador.entity/coordenador.entity';

@Entity('cronogramas')
export class Cronograma {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Coordenador)
  coordenador: Coordenador;

  @Column('date')
  entregaProposta: Date;

  @Column('date')
  entregaReelaboracaoProposta: Date;

  @Column('date')
  entregaTc: Date;

  @Column('date')
  entregaReelaboracaoTc: Date;
}
