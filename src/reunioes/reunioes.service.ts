import { Injectable } from '@nestjs/common';
import { CreateReunioeDto } from './dto/create-reunioe.dto';
import { UpdateReunioeDto } from './dto/update-reunioe.dto';

@Injectable()
export class ReunioesService {
  create(createReunioeDto: CreateReunioeDto) {
    return 'This action adds a new reunioe';
  }

  findAll() {
    return `This action returns all reunioes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reunioe`;
  }

  update(id: number, updateReunioeDto: UpdateReunioeDto) {
    return `This action updates a #${id} reunioe`;
  }

  remove(id: number) {
    return `This action removes a #${id} reunioe`;
  }
}
