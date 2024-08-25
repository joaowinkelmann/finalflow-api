import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoordenadoresService } from './coordenadores.service';
import { CreateCoordenadorDto } from './dto/create-coordenador.dto';
import { UpdateCoordenadorDto } from './dto/update-coordenador.dto';
import { NiveisAcesso } from 'src/auth/niveisacesso.decorator';
import { NivelAcesso } from '@prisma/client';

@Controller('professores')
export class CoordenadoresController {
  constructor(private readonly coordenadoresService: CoordenadoresService) {}

  @Post()
  @NiveisAcesso(NivelAcesso.coordenador)
  create(@Body() createCoordenadorDto: CreateCoordenadorDto) {
    return this.coordenadoresService.create(createCoordenadorDto);
  }

  @Get()
  @NiveisAcesso(NivelAcesso.coordenador)
  findAll() {
    return this.coordenadoresService.findAll();
  }

  @Get(':id')
  @NiveisAcesso(NivelAcesso.coordenador)
  findOne(@Param('id') id: string) {
    return this.coordenadoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoordenadorDto: UpdateCoordenadorDto) {
    return this.coordenadoresService.update(+id, updateCoordenadorDto);
  }

  @Delete(':id')
  @NiveisAcesso(NivelAcesso.coordenador)
  remove(@Param('id') id: string) {
    return this.coordenadoresService.remove(+id);
  }
}
