import { Injectable } from '@nestjs/common';
import { CreateBancaDto } from './dto/create-banca.dto';
import { UpdateBancaDto } from './dto/update-banca.dto';

@Injectable()
export class BancasService {
  defineBanca(createBancaDto: CreateBancaDto) {
    // return 'This action adds a new banca';
    // essa ação é chamada pelo coordenador para definir uma banca à uma orientação

    



  }

  findAll() {
    return `This action returns all bancas`;
  }

  findOne(id: string) {
    return `This action returns a #${id} banca`;
  }

  update(id: string, updateBancaDto: UpdateBancaDto) {
    return `This action updates a #${id} banca`;
  }

  remove(id: string) {
    return `This action removes a #${id} banca`;
  }
}
