import { Controller, Get, Post, Body, Put, Param, Delete, Request } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { NiveisAcesso } from 'src/auth/niveisacesso.decorator';
import { NivelAcesso } from '@prisma/client';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('/create')
  @NiveisAcesso(NivelAcesso.coordenador)
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get('/getAll')
  @NiveisAcesso(NivelAcesso.coordenador)
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get('/getOne/:id')
  @NiveisAcesso(NivelAcesso.coordenador)
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  @Put('/update/:id')
  @NiveisAcesso(NivelAcesso.coordenador)
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete('/deleteUser/:id')
  @NiveisAcesso(NivelAcesso.coordenador)
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  }

  @Post('/setAvatar')
  uploadAvatar(@Body() avatar: any, @Request() req) {
    return this.usuariosService.uploadAvatar(avatar, req.user.id);
  }

}
