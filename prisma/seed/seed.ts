import { PrismaClient } from '@prisma/client';
import { NivelAcesso } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const testPassword = process.env.USER_SEED_PASSWORD || '-v%*>IX>8PXU*7}<5#=.';
const saltRounds = 10;

async function main() {
  const hashedPassword = await bcrypt.hash(testPassword, saltRounds);

  // para ter um usuario/aluno, precisamos primeiro ter um curso, entao vamos criar um padraozera
  const cienciaDaComputacao = await prisma.curso.upsert({
    where: { id_curso: "1" },
    update: {},
    create: {
      id_curso: '1',
      nome: 'Ciência da Computação',
    },
  });

  // COORDENADORA
  const roberta = await prisma.usuario.upsert({
    where: { email: "000robertateste@appkurt.io" },
    update: {},
    create: {
      id: randomUUID(),
      email: 'robertateste@appkurt.io',
      nome: 'Roberta Teste',
      senha: hashedPassword,
      nivel_acesso: NivelAcesso.coordenador,
      data_cadastro: new Date()
    },
  });
  
  // PROFESSOR
  const amilton = await prisma.usuario.upsert({
    where: { email: "000amiltonteste@appkurt.io"},
    update: {},
    create: {
      id: randomUUID(),
      email: 'amiltonteste@appkurt.io',
      nome: 'Amilton Teste',
      senha: hashedPassword,
      nivel_acesso: NivelAcesso.professor,
      data_cadastro: new Date()
    }
  });

  // ALUNO
  const carlos = await prisma.usuario.upsert({
    where: { email: "000carlosteste@appkurt.io" },
    update: {},
    create: {
      id: randomUUID(),
      email: 'carlosteste@appkurt.io',
      nome: 'Carlos Teste',
      senha: hashedPassword,
      nivel_acesso: NivelAcesso.aluno,
      data_cadastro: new Date()
      //   id            String       @id @default(uuid())
      //   nome          String
      //   email         String       @unique
      //   senha         String
      //   nivel_acesso  NivelAcesso
      //   data_cadastro DateTime     @default(now())
      //   Aluno         Aluno?
      //   Professor     Professor?
      //   Coordenador   Coordenador?
      //   Alerta        Alerta[]
    },
  });

  const coordenadoraRoberta = await prisma.coordenador.upsert({
    where: { id_coordenador: "0" },
    update: {},
    create: {
      id_coordenador: '0',
      idUsuario: roberta.id
      // departamento: 'Departamento de Computação'
      // id_coordenador String       @id @default(uuid())
      // usuarioId       String       @unique
      // usuario         Usuario      @relation(fields: [usuarioId], references: [id])
      // Curso           Curso[]
    }
  });

  const professorAmilton = await prisma.professor.upsert({
    where : { id_professor: "1" },
    update: {},
    create: {
      id_professor: '1',
      departamento: 'Departamento de Computação',
      idUsuario: amilton.id
      // id_professor String       @id @default(uuid())
      // departamento String
      // usuarioId    String       @unique
      // usuario      Usuario      @relation(fields: [usuarioId], references: [id])
      // Orientador   Orientador[]
      // Cronograma   Cronograma[]
      // Banca1       Banca[]      @relation("Professor1")
      // Banca2       Banca[]      @relation("Professor2")
    }
  });

  const carlosAluno = await prisma.aluno.upsert({
    // id_aluno   String       @id @default(uuid())
    // matricula  Int
    // idUsuario  String       @unique
    // usuario    Usuario      @relation(fields: [idUsuario], references: [id])
    // Orientador Orientador[]
    // Banca      Banca[]
    // Curso      Curso        @relation(fields: [cursoId], references: [id_curso])
    // cursoId    String
    where: { id_aluno: "1" },
    update: {},
    create: {
      id_aluno: '1',
      matricula: 123456,
      idUsuario: carlos.id,
      cursoId: '1'
    },
  }
  );
}

// main();
try {
  main()
} catch (e) {
  console.error(e)
  process.exit(1)
}