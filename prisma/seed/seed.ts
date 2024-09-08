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
  // com  isso aqui fica impossivel usar o "init"
  /*
  const roberta = await prisma.usuario.upsert({
    where: { email: "000robertateste@appkurt.io" },
    update: {},
    create: {
      id_usuario: randomUUID(),
      email: 'robertateste@appkurt.io',
      nome: 'Roberta Teste',
      senha: hashedPassword,
      nivel_acesso: NivelAcesso.coordenador,
      data_cadastro: new Date()
    },
  });
  */
  
  // PROFESSOR
  const amilton = await prisma.usuario.upsert({
    where: { email: "000amiltonteste@appkurt.io"},
    update: {},
    create: {
      id_usuario: randomUUID(),
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
      id_usuario: randomUUID(),
      email: 'carlosteste@appkurt.io',
      nome: 'Carlos Teste',
      senha: hashedPassword,
      nivel_acesso: NivelAcesso.aluno,
      data_cadastro: new Date()
    },
  });

  // const coordenadoraRoberta = await prisma.coordenador.upsert({
  //   where: { id_coordenador: "0" },
  //   update: {},
  //   create: {
  //     id_coordenador: '0',
  //     idusuario: roberta.id_usuario
  //   }
  // });

  const professorAmilton = await prisma.professor.upsert({
    where : { id_professor: "1" },
    update: {},
    create: {
      id_professor: '1',
      departamento: 'Departamento de Computação',
      idusuario: amilton.id_usuario
    }
  });

  const carlosAluno = await prisma.aluno.upsert({
    where: { id_aluno: "1" },
    update: {},
    create: {
      id_aluno: '1',
      matricula: 123456,
      idusuario: carlos.id_usuario,
      idcurso: '1'
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