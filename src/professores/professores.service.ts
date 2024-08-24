import { Injectable } from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professore.dto';

@Injectable()
export class ProfessoresService {
  create(createProfessoeDto: CreateProfessorDto) {
    return 'This action adds a new professore';
  }

  findAll() {
    return `This action returns all professores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} professore`;
  }

  update(id: number, updateProfessorDto: UpdateProfessorDto) {
    return `This action updates a #${id} professore`;
  }

  remove(id: number) {
    return `This action removes a #${id} professore`;
  }
}
