import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CoordenadoresService } from './coordenadores.service';
import { TransferCoordenadorDto } from './dto/transfer-coordenador.dto';
import { UpdateCoordenadorDto } from './dto/update-coordenador.dto';
import { NiveisAcesso } from 'src/auth/niveisacesso.decorator';
import { NivelAcesso } from '@prisma/client';

@Controller('coordenadores')
export class CoordenadoresController {
  constructor(private readonly coordenadoresService: CoordenadoresService) {}

  @Post('/transfer')
  @NiveisAcesso(NivelAcesso.coordenador)
  transfer(@Body() transferCoordenadorDto: TransferCoordenadorDto, @Req() req) {
    return this.coordenadoresService.transfer(transferCoordenadorDto, req.user.sub);
  }

  @Get()
  @NiveisAcesso(NivelAcesso.coordenador)
  findAll() {
    return this.coordenadoresService.findAll();
  }

  @Get(':id')
  @NiveisAcesso(NivelAcesso.coordenador)
  findOne(@Param('id') id: string) {
    return this.coordenadoresService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoordenadorDto: UpdateCoordenadorDto) {
    return this.coordenadoresService.update(id, updateCoordenadorDto);
  }

  @Delete(':id')
  @NiveisAcesso(NivelAcesso.coordenador)
  remove(@Param('id') id: string) {
    return this.coordenadoresService.remove(id);
  }
}
