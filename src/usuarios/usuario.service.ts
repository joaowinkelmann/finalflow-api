import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async getAllUsuarios() {
    return this.prisma.usuario.findMany();
  }

  async getUsuarioById(id: string) {
    return this.prisma.usuario.findUnique({
      where: { id },
    });
  }

  async createUsuario(data: any) {
    return this.prisma.usuario.create({
      data,
    });
  }

  async updateUsuario(id: string, data: any) {
    return this.prisma.usuario.update({
      where: { id },
      data,
    });
  }

  async deleteUsuario(id: string) {
    return this.prisma.usuario.delete({
      where: { id },
    });
  }
}