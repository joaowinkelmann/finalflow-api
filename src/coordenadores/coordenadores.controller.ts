import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CoordenadoresService } from './coordenadores.service';
import { CreateCoordenadorDto } from './dto/create-coordenador.dto';
import { TransferCoordenadorDto } from './dto/transfer-coordenador.dto';
import { UpdateCoordenadorDto } from './dto/update-coordenador.dto';
import { NiveisAcesso } from 'src/auth/niveisacesso.decorator';
import { NivelAcesso } from '@prisma/client';
import { Public } from 'src/auth/public.decorator';
import { ReqReturnDto } from 'src/auth/dto/req-return.dto';

@Controller('coordenadores')
export class CoordenadoresController {
  constructor(private readonly coordenadoresService: CoordenadoresService) {}

  // somente quando não houver nenhum usuário no sistema ainda (ambiente vazio)
  @Post('/init')
  @Public()
  init(@Body() createCoordenadorDto: CreateCoordenadorDto) {
    return this.coordenadoresService.init(createCoordenadorDto);
  }

  @Post('/transfer')
  @NiveisAcesso(NivelAcesso.coordenador)
  transfer(@Body() transferCoordenadorDto: TransferCoordenadorDto, @Req() req: ReqReturnDto) {
    return this.coordenadoresService.transfer(transferCoordenadorDto, req.user.sub);
  }

  @Get('/getAll')
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
