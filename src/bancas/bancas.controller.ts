import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { BancasService } from './bancas.service';
import { CreateBancaDto } from './dto/create-banca.dto';
import { UpdateBancaDto } from './dto/update-banca.dto';
import { NiveisAcesso } from 'src/auth/niveisacesso.decorator';
import { NivelAcesso } from '@prisma/client';
import { ReqReturnDto } from 'src/auth/dto/req-return.dto';

@Controller('bancas')
export class BancasController {
  constructor(private readonly bancasService: BancasService) {}

  @Post('/create')
  @NiveisAcesso(NivelAcesso.coordenador) // os coordenadores que definem as bancas
  define(@Body() createBancaDto: CreateBancaDto) {
    return this.bancasService.defineBanca(createBancaDto);
  }

  @Get('/getAll')
  @NiveisAcesso(NivelAcesso.coordenador, NivelAcesso.professor) // verificar: professor tem permissão de ver todas as bancas disponíveis?
  findAll() {
    return this.bancasService.findAll();
  }

  @Get("/getMyBancas")
  @NiveisAcesso(NivelAcesso.professor, NivelAcesso.coordenador)
  getMyBancas(@Req() req: ReqReturnDto) {
    return this.bancasService.getMyBancas(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bancasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBancaDto: UpdateBancaDto) {
    return this.bancasService.update(id, updateBancaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bancasService.remove(id);
  }
}