import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsuariosService } from './usuario.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  async getAllUsuarios() {
    return this.usuariosService.getAllUsuarios();
  }

  @Get(':id')
  async getUsuarioById(@Param('id') id: string) {
    return this.usuariosService.getUsuarioById(id);
  }

  @Post()
  async createUsuario(@Body() data: any) {
    return this.usuariosService.createUsuario(data);
  }

  @Put(':id')
  async updateUsuario(@Param('id') id: string, @Body() data: any) {
    return this.usuariosService.updateUsuario(id, data);
  }

  @Delete(':id')
  async deleteUsuario(@Param('id') id: string) {
    return this.usuariosService.deleteUsuario(id);
  }
}