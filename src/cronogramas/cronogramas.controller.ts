import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CronogramasService } from './cronogramas.service';
import { CreateCronogramaDto } from './dto/create-cronograma.dto';
import { UpdateCronogramaDto } from './dto/update-cronograma.dto';
import { NiveisAcesso } from 'src/auth/niveisacesso.decorator';
import { NivelAcesso } from '@prisma/client';
import { ReqReturnDto } from 'src/auth/dto/req-return.dto';

@Controller('cronogramas')
export class CronogramasController {
  constructor(private readonly cronogramasService: CronogramasService) {}

  @Post('create')
  @NiveisAcesso(NivelAcesso.coordenador)
  create(@Body() createCronogramaDto: CreateCronogramaDto, @Req() req: ReqReturnDto) {
    const idusuario = req.user.sub;
    return this.cronogramasService.create(createCronogramaDto, idusuario);
  }

  @Get('/getAll')
  findAll() {
    return this.cronogramasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cronogramasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCronogramaDto: UpdateCronogramaDto) {
    return this.cronogramasService.update(id, updateCronogramaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cronogramasService.remove(id);
  }
}
