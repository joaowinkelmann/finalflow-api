import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfessoresService } from './professores.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professore.dto';
import { NiveisAcesso } from 'src/auth/niveisacesso.decorator';
import { NivelAcesso } from '@prisma/client';

@Controller('professores')
export class ProfessoresController {
  constructor(private readonly professoresService: ProfessoresService) {}

  @Post()
  @NiveisAcesso(NivelAcesso.coordenador)
  create(@Body() createProfessorDto: CreateProfessorDto) {
    return this.professoresService.create(createProfessorDto);
  }

  @Get()
  findAll() {
    return this.professoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfessorDto: UpdateProfessorDto) {
    return this.professoresService.update(+id, updateProfessorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professoresService.remove(+id);
  }
}
