import { Injectable } from '@nestjs/common';
import { CreateEntregaDto } from './dto/create-entrega.dto';
import { UpdateEntregaDto } from './dto/update-entrega.dto';

@Injectable()
export class EntregasService {
  create(createEntregasDto: CreateEntregaDto) {
    return 'This action adds a new entrega';
  }

  findAll() {
    return `This action returns all entrega`;
  }

  findOne(id: string) {
    return `This action returns a #${id} entrega`;
  }

  update(id: string, updateEntregasDto: UpdateEntregaDto) {
    return `This action updates a #${id} entrega`;
  }

  remove(id: string) {
    return `This action removes a #${id} entrega`;
  }
}
