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
  @NiveisAcesso(NivelAcesso.coordenador) // somente o coordenador se atenta às questões de Prazo e/ou Cronograma
  create(@Body() createPrazoDto: CreatePrazoDto) {
    return this.prazosService.create(createPrazoDto);
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
  @NiveisAcesso(NivelAcesso.coordenador) // somente coordena altera os prazos, precisamos também verificar se pode mesmo, pode dar muito ruim se o coordena jogar o prazo para o passado, zaralhando as entregas
  update(@Param('id') id: string, @Body() updatePrazoDto: UpdatePrazoDto) {
    return this.prazosService.update(id, updatePrazoDto);
  }

  @Delete(':id')
  @NiveisAcesso(NivelAcesso.coordenador)
  remove(@Param('id') id: string) {
    return this.prazosService.remove(id);
  }
}
