import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BancasService } from './bancas.service';
import { CreateBancaDto } from './dto/create-banca.dto';
import { UpdateBancaDto } from './dto/update-banca.dto';

@Controller('bancas')
export class BancasController {
  constructor(private readonly bancasService: BancasService) {}

  @Post()
  create(@Body() createBancaDto: CreateBancaDto) {
    return this.bancasService.create(createBancaDto);
  }

  @Get()
  findAll() {
    return this.bancasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bancasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBancaDto: UpdateBancaDto) {
    return this.bancasService.update(+id, updateBancaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bancasService.remove(+id);
  }
}
