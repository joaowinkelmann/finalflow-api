import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReunioesService } from './reunioes.service';
import { CreateReuniaoDto } from './dto/create-reuniao.dto';
import { UpdateReuniaoDto } from './dto/update-reuniao.dto';
import { NiveisAcesso } from 'src/auth/niveisacesso.decorator';
import { NivelAcesso } from '@prisma/client';

@Controller('reunioes')
export class ReunioesController {
  constructor(private readonly reunioesService: ReunioesService) { }

  @Post('/addToOrientacao')
  // @NiveisAcesso(NivelAcesso.aluno, NivelAcesso.professor)
  @NiveisAcesso(NivelAcesso.professor) // sepah só professor cria uma reuniao ne
  create(@Param('idOrientacao') idOrientacao: string, @Body() createReuniaoDto: CreateReuniaoDto) {
    // console.log('idOrientacao', idOrientacao);

    return this.reunioesService.create(createReuniaoDto);
  }

  @Get()
  findAll() {
    return this.reunioesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reunioesService.findOne(id);
  }

  @Patch(':id')
  @NiveisAcesso(NivelAcesso.aluno, NivelAcesso.professor)
  update(@Param('id') id: string, @Body() updateReuniaoDto: UpdateReuniaoDto) {
    return this.reunioesService.update(id, updateReuniaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reunioesService.remove(id);
  }
}
