import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrientacoesService } from './orientacoes.service';
import { CreateOrientacaoDto } from './dto/create-orientacao.dto';
import { UpdateOrientacaoDto } from './dto/update-orientacao.dto';
import { NiveisAcesso } from 'src/auth/niveisacesso.decorator';
import { NivelAcesso } from '@prisma/client';

@Controller('orientacoes')
export class OrientacoesController {
  constructor(private readonly orientacoesService: OrientacoesService) {}

  @Post()
  @NiveisAcesso(NivelAcesso.coordenador)
  create(@Body() createOrientacaoDto: CreateOrientacaoDto) {
    return this.orientacoesService.create(createOrientacaoDto);
  }

  @Get()
  @NiveisAcesso(NivelAcesso.coordenador)
  findAll() {
    return this.orientacoesService.findAll();
  }

  @Get(':id')
  @NiveisAcesso(NivelAcesso.coordenador)
  findOne(@Param('id') id: string) {
    return this.orientacoesService.findOne(id);
  }

  @Patch(':id')
  @NiveisAcesso(NivelAcesso.coordenador)
  update(@Param('id') id: string, @Body() updateOrientacaoDto: UpdateOrientacaoDto) {
    return this.orientacoesService.update(id, updateOrientacaoDto);
  }

  @Delete(':id')
  @NiveisAcesso(NivelAcesso.coordenador)
  remove(@Param('id') id: string) {
    return this.orientacoesService.remove(id);
  }
}
