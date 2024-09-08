import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntregasService } from './entregas.service';
import { CreateEntregaDto } from './dto/create-entrega.dto';
import { UpdateEntregaDto } from './dto/update-entrega.dto';

@Controller('entregas')
export class EntregasController {
  constructor(private readonly entregasService: EntregasService) {}

  @Post()
  create(@Body() createEntregasDto: CreateEntregaDto) {
    return this.entregasService.create(createEntregasDto);
  }

  @Get()
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
