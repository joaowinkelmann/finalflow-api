import { Injectable } from '@nestjs/common';
import { CreateAvaliacoeDto } from './dto/create-avaliacoe.dto';
import { UpdateAvaliacoeDto } from './dto/update-avaliacoe.dto';

@Injectable()
export class AvaliacoesService {
  create(createAvaliacoeDto: CreateAvaliacoeDto) {
    return 'This action adds a new avaliacoe';
  }

  findAll() {
    return `This action returns all avaliacoes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} avaliacoe`;
  }

  update(id: number, updateAvaliacoeDto: UpdateAvaliacoeDto) {
    return `This action updates a #${id} avaliacoe`;
  }

  remove(id: number) {
    return `This action removes a #${id} avaliacoe`;
  }
}
