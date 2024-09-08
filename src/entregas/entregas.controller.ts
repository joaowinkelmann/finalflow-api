import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { EntregasService } from './entregas.service';
import { CreateEntregaDto } from './dto/create-entrega.dto';
import { UpdateEntregaDto } from './dto/update-entrega.dto';
import { NiveisAcesso } from 'src/auth/niveisacesso.decorator';
import { NivelAcesso } from '@prisma/client';

@Controller('entregas')
export class EntregasController {
  constructor(private readonly entregasService: EntregasService) {}

  // o cara vai fazer a entrega na tela de prazos dele /na orientacao

  @NiveisAcesso(NivelAcesso.aluno)
  @Post('/create')
  submit(@Body() createEntregasDto: CreateEntregaDto, @Req() req) {
    return this.entregasService.submit(createEntregasDto, req.user.id);
  }

  @Get('/getAll')
  findAll() {
    return this.entregasService.findAll();
  }

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
