import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrazosService } from './prazos.service';
import { CreatePrazoDto } from './dto/create-prazo.dto';
import { UpdatePrazoDto } from './dto/update-prazo.dto';
import { NiveisAcesso } from 'src/auth/niveisacesso.decorator';
import { NivelAcesso } from '@prisma/client';

@Controller('prazos')
export class PrazosController {
  constructor(private readonly prazosService: PrazosService) {}

  @Post('create')
  @NiveisAcesso(NivelAcesso.coordenador, NivelAcesso.professor)
  create(@Body() createPrazoDto: CreatePrazoDto) {
    return this.prazosService.create(createPrazoDto);
  }

  @Post('/generateAlerts/:id')
  @NiveisAcesso(NivelAcesso.coordenador, NivelAcesso.professor)
  generateAlerts(@Param('id') id: string) {
    // return this.prazosService.generateAlerts(id);
  }

  @Get()
  findAll() {
    return this.prazosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prazosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrazoDto: UpdatePrazoDto) {
    return this.prazosService.update(id, updatePrazoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prazosService.remove(id);
  }
}
