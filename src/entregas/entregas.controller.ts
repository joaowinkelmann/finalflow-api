import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { EntregasService } from './entregas.service';
import { CreateEntregaDto } from './dto/create-entrega.dto';
import { UpdateEntregaDto } from './dto/update-entrega.dto';
import { NiveisAcesso } from 'src/auth/niveisacesso.decorator';
import { NivelAcesso } from '@prisma/client';
import { ReqReturnDto } from 'src/auth/dto/req-return.dto';

@Controller('entregas')
export class EntregasController {
  constructor(private readonly entregasService: EntregasService) {}

  // o cara vai fazer a entrega na tela de prazos dele /na orientacao

  @NiveisAcesso(NivelAcesso.aluno)
  @Post('/submit/')
  submit(@Body() createEntregasDto: CreateEntregaDto, @Req() req: ReqReturnDto) {
    return this.entregasService.submit(createEntregasDto, req.user.sub);
  }

  // busca tudo que tem de entregas, só o coordena acessa
  @NiveisAcesso(NivelAcesso.coordenador)
  @Get('/getAll')
  findAll() {
    return this.entregasService.findAll();
  }

  // busca as entregas que estão vinculads à mim, eu sendo professor
  @NiveisAcesso(NivelAcesso.professor)
  @Get('/getStudentSubmissions')
  getStudentSubmissions(@Req() req: ReqReturnDto) {
    return this.entregasService.getStudentSubmissions(req.user.sub);
  }

  // busca as entregas que estão vinculads à mim, eu sendo aluno
  @NiveisAcesso(NivelAcesso.aluno)
  @Get('/getMySubmissions')
  getMySubmissions(@Req() req: ReqReturnDto) {
    return this.entregasService.getMySubmissions(req.user.sub);
  }

  @Get('/getFileFromEntrega/:id')
  getFileFromEntrega(@Param('id') identrega: string, @Req() req: ReqReturnDto) {
    return this.entregasService.getFileFromEntrega(req.user.sub, req.user.nivel_acesso, identrega);
  }

  @NiveisAcesso(NivelAcesso.coordenador)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entregasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntregasDto: UpdateEntregaDto) {
    return this.entregasService.update(id, updateEntregasDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entregasService.remove(id);
  }
}
