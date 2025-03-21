import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req } from '@nestjs/common';
import { ReunioesService } from './reunioes.service';
import { CreateReuniaoDto } from './dto/create-reuniao.dto';
import { UpdateReuniaoDto } from './dto/update-reuniao.dto';

import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';

import { NiveisAcesso } from 'src/auth/niveisacesso.decorator';
import { NivelAcesso } from '@prisma/client';
import { ReqReturnDto } from 'src/auth/dto/req-return.dto';

@Controller('reunioes')
export class ReunioesController {
  constructor(private readonly reunioesService: ReunioesService) { }

  @Post('/addToOrientacao')
  // @NiveisAcesso(NivelAcesso.aluno, NivelAcesso.professor)
  // @NiveisAcesso(NivelAcesso.professor) // sepah só professor cria uma reuniao ne
  @NiveisAcesso(NivelAcesso.professor, NivelAcesso.coordenador) // coordenador tbm pode criar reuniao, pois ele é um professor
  create(@Body() createReuniaoDto: CreateReuniaoDto) {
    return this.reunioesService.create(createReuniaoDto);
  }

  @Post('/addDocumento')
  @NiveisAcesso(NivelAcesso.professor, NivelAcesso.aluno, NivelAcesso.coordenador)
  // @todo - validar se a pessoa que ta tentando mexer no documento é da orientacao
  createDocumento(@Body() createDocumentoDto: CreateDocumentoDto) {
    return this.reunioesService.createDocumento(createDocumentoDto);
  }

  @Put('/updateDocumento')
  @NiveisAcesso(NivelAcesso.professor, NivelAcesso.aluno, NivelAcesso.coordenador)
  updateDocumento(@Body() updateDocumentoDto: UpdateDocumentoDto) {
    return this.reunioesService.updateDocumento(updateDocumentoDto);
  }

  @Get('/getReunioes')
  @NiveisAcesso(NivelAcesso.professor, NivelAcesso.coordenador, NivelAcesso.aluno)
  getReunioes(@Req() req: ReqReturnDto) {
    return this.reunioesService.getReunioes(req.user.sub, req.user.nivel_acesso);
  }

  @Get()
  @NiveisAcesso(NivelAcesso.coordenador)
  findAll() {
    return this.reunioesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reunioesService.findOne(id);
  }

  @Patch(':id')
  @NiveisAcesso(NivelAcesso.aluno, NivelAcesso.professor, NivelAcesso.coordenador)
  update(@Param('id') id: string, @Body() updateReuniaoDto: UpdateReuniaoDto) {
    return this.reunioesService.update(id, updateReuniaoDto);
  }

  @Delete(':id')
  @NiveisAcesso(NivelAcesso.coordenador)
  remove(@Param('id') id: string) {
    return this.reunioesService.remove(id);
  }

  @Delete('/removeDocumento/:id')
  @NiveisAcesso(NivelAcesso.professor, NivelAcesso.coordenador)
  removeDocumento(@Param('id') id: string) {
    return this.reunioesService.removeDocumento(id);
  }
}
