import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReunioesService } from './reunioes.service';
import { CreateReunioeDto } from './dto/create-reunioe.dto';
import { UpdateReunioeDto } from './dto/update-reunioe.dto';

@Controller('reunioes')
export class ReunioesController {
  constructor(private readonly reunioesService: ReunioesService) {}

  @Post('/addToOrientacao')
  create(@Param('idOrientacao') idOrientacao: string, @Body() createReunioeDto: CreateReunioeDto) {
    console.log('idOrientacao', idOrientacao);
    // return this.reunioesService.create(createReunioeDto);
  }

  @Get()
  findAll() {
    return this.reunioesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reunioesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReunioeDto: UpdateReunioeDto) {
    return this.reunioesService.update(+id, updateReunioeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reunioesService.remove(+id);
  }
}
