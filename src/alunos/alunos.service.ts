import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlunosService {
  constructor(private prisma: PrismaService) {}

  async create(createAlunoDto: CreateAlunoDto) {
    try {
      return await this.prisma.aluno.create({
        data: createAlunoDto,
      });
    }
    catch (error) {
      return error.message;
    }
  }

  async findAll() {
    try {
      return await this.prisma.aluno.findMany();
    }
    catch (error) {
      return error.message;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} aluno`;
  }

  update(id: number, updateAlunoDto: UpdateAlunoDto) {
    return `This action updates a #${id} aluno`;
  }

  remove(id: number) {
    return `This action removes a #${id} aluno`;
  }
}
