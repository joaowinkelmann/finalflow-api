import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { Professor } from 'src/professores/professor.entity/professor.entity';

export enum NivelAcesso {
  COORDENADOR = "coordenador",
  PROFESSOR = "professor",
  ALUNO = "aluno"
}

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: string;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  matricula: string;

  @Column()
  senha: string;

  @Column({
    type: "enum",
    enum: NivelAcesso,
    default: NivelAcesso.ALUNO
  })
  nivel_acesso: NivelAcesso;

  @ManyToOne(() => Professor, professor => professor.alunos)
  orientador: Professor;
}
