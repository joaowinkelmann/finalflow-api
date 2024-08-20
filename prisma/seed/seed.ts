import { PrismaClient } from '@prisma/client';
import { NivelAcesso } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const carlos = await prisma.usuario.upsert({
        where: { email: "carlosteste@appkurt.io"} ,
        update: {},
        create: {
          id: '1',
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
}

main();