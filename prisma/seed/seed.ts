import { PrismaClient } from '@prisma/client';
import { NivelAcesso } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {

  // para ter um usuario/aluno, precisamos primeiro ter um curso, entao vamos criar um padraozera
  const cienciaDaComputacao = await prisma.curso.upsert({
    where: { id_curso: "1" },
    update: {},
    create: {
      id_curso: '1',
      nome: 'Ciência da Computação',
    },
  });

  const amilton = await prisma.usuario.upsert({
    where: { email: "amiltonteste@appkurt.io"},
    update: {},
    create: {
      id: '2',
      email: 'amiltonteste@appkurt.io',
      nome: 'Amilton Teste',
      senha: '123456',
      nivel_acesso: NivelAcesso.professor,
      data_cadastro: new Date()
    }
  });

  const professorAmilton = await prisma.professor.upsert({
    where : { id_professor: "1" },
    update: {},
    create: {
      id_professor: '1',
      departamento: 'Departamento de Computação',
      usuarioId: '1'
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

  const carlos = await prisma.usuario.upsert({
    where: { email: "carlosteste@appkurt.io" },
    update: {},
    create: {
      id: '2',
      email: 'carlosteste@appkurt.io',
      nome: 'Carlos Teste',
      senha: '123456',
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
  }).then((usuario) => {
    console.log({ usuario });
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
      idUsuario: '2',
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