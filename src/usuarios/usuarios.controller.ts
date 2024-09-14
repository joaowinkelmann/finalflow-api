import { Controller, Get, Post, Body, Put, Param, Delete, Request } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { SetAvatarDto } from './dto/set-avatar.dto';
import { NiveisAcesso } from 'src/auth/niveisacesso.decorator';
import { NivelAcesso } from '@prisma/client';
import { Public } from 'src/auth/public.decorator';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('/create')
  @NiveisAcesso(NivelAcesso.coordenador)
  @Public()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Post('/changepassword')
  changePassword(@Body() changePasswordDto: ChangePasswordDto, @Request() req) {
    return this.usuariosService.changePassword(changePasswordDto, req.user.sub);
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
  uploadAvatar(@Body() setAvatarDto: SetAvatarDto, @Request() req) {
    return this.usuariosService.uploadAvatar(setAvatarDto, req.user.sub);
  }
}
