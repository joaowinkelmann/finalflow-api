import { Module } from '@nestjs/common';
import { AlunosModule } from './alunos/alunos.module';
import { PrismaService } from './prisma/prisma.service';
import { UsuariosModule } from './usuarios/usuario.module';

@Module({
  imports: [AlunosModule, UsuariosModule],
  providers: [PrismaService],
})
export class AppModule {}