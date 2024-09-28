import { Controller, Get, Post, Body, Put, Patch, Param, Delete, Req } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { SetAvatarDto } from './dto/set-avatar.dto';
import { NiveisAcesso } from 'src/auth/niveisacesso.decorator';
import { NivelAcesso } from '@prisma/client';
import { Public } from 'src/auth/public.decorator';
import { ReqReturnDto } from 'src/auth/dto/req-return.dto';
import { EditUsuarioDto } from './dto/edit-usuario.dto';

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
  changePassword(@Body() changePasswordDto: ChangePasswordDto, @Req() req: ReqReturnDto) {
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
  uploadAvatar(@Body() setAvatarDto: SetAvatarDto, @Req() req: ReqReturnDto) {
    return this.usuariosService.uploadAvatar(setAvatarDto, req.user.sub);
  }

  @Get('/getMyData')
  @NiveisAcesso(NivelAcesso.coordenador, NivelAcesso.professor, NivelAcesso.aluno)
  getMyData(@Req() req: ReqReturnDto) {
    return this.usuariosService.getMyData(req.user.sub, req.user.nivel_acesso);
  }

  @Patch('/editMyData')
  @NiveisAcesso(NivelAcesso.coordenador, NivelAcesso.professor, NivelAcesso.aluno)
  editMyData(@Body() editUsuarioDto: EditUsuarioDto, @Req() req: ReqReturnDto) {
    return this.usuariosService.editMyData(req.user.sub, editUsuarioDto);
  }
}
