import { Module } from '@nestjs/common';
import { AlunosModule } from './alunos/alunos.module';
import { PrismaService } from './prisma/prisma.service';
import { CursosModule } from './cursos/cursos.module';
import { ProfessoresModule } from './professores/professores.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [AlunosModule, UsuariosModule, CursosModule, ProfessoresModule],
  providers: [PrismaService],
})
export class AppModule {}