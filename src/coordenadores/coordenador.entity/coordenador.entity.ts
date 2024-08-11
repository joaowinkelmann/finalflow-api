import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('coordenadores')
export class Coordenador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;
}
