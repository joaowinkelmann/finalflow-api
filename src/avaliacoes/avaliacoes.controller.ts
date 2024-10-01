import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AvaliacoesService } from './avaliacoes.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { NiveisAcesso } from 'src/auth/niveisacesso.decorator';
import { NivelAcesso } from '@prisma/client';

@Controller('avaliacoes')
export class AvaliacoesController {
  constructor(private readonly avaliacoesService: AvaliacoesService) {}

  @Post()
  @NiveisAcesso(NivelAcesso.coordenador, NivelAcesso.professor)
  create(@Body() createAvaliacaoDto: CreateAvaliacaoDto) {
    return this.avaliacoesService.create(createAvaliacaoDto);
  }

  @Get()
  @NiveisAcesso(NivelAcesso.coordenador)
  findAll() {
    return this.avaliacoesService.findAll();
  }

  @Get(':id')
  @NiveisAcesso(NivelAcesso.coordenador, NivelAcesso.professor)
  findOne(@Param('id') id: string) {
    return this.avaliacoesService.findOne(id);
  }

  @Patch(':id')
  @NiveisAcesso(NivelAcesso.coordenador, NivelAcesso.professor)
  update(@Param('id') id: string, @Body() updateAvaliacaoDto: UpdateAvaliacaoDto) {
    return this.avaliacoesService.update(id, updateAvaliacaoDto);
  }

  @Delete(':id')
  @NiveisAcesso(NivelAcesso.coordenador, NivelAcesso.professor)
  remove(@Param('id') id: string) {
    return this.avaliacoesService.remove(id);
  }
}
