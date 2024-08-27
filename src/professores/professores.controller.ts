import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfessoresService } from './professores.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { NiveisAcesso } from 'src/auth/niveisacesso.decorator';
import { NivelAcesso } from '@prisma/client';

@Controller('professores')
export class ProfessoresController {
  constructor(private readonly professoresService: ProfessoresService) {}

  @Post('/create')
  @NiveisAcesso(NivelAcesso.coordenador)
  create(@Body() createProfessorDto: CreateProfessorDto) {
    return this.professoresService.create(createProfessorDto);
  }

  @Get('/getAll')
  @NiveisAcesso(NivelAcesso.coordenador)
  findAll() {
    return this.professoresService.findAll();
  }

  @Get(':id')
  @NiveisAcesso(NivelAcesso.coordenador)
  findOne(@Param('id') id: string) {
    return this.professoresService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfessorDto: UpdateProfessorDto) {
    return this.professoresService.update(id, updateProfessorDto);
  }

  @Delete(':id')
  @NiveisAcesso(NivelAcesso.coordenador)
  remove(@Param('id') id: string) {
    return this.professoresService.remove(id);
  }
}
