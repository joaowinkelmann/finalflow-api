import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CursosService {
  constructor(private prisma: PrismaService) {}

  async create(createCursoDto: CreateCursoDto) {
    try {
      return await this.prisma.curso.create({
        data: createCursoDto,
      });
    }
    catch (error) {
      return error.message;
    }
  }

  async findAll() {
    try {
      return await this.prisma.curso.findMany();
    } catch (error) {
      return error.message;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} curso`;
  }

  update(id: number, updateCursoDto: UpdateCursoDto) {
    return `This action updates a #${id} curso`;
  }

  remove(id: number) {
    return `This action removes a #${id} curso`;
  }
}
