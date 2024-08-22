import { Module } from '@nestjs/common';
import { AlunosModule } from './alunos/alunos.module';
import { PrismaService } from './prisma/prisma.service';
import { UsuariosModule } from './usuarios/usuario.module';
import { CursosModule } from './cursos/cursos.module';

@Module({
  imports: [AlunosModule, UsuariosModule, CursosModule],
  providers: [PrismaService],
})
export class AppModule {}