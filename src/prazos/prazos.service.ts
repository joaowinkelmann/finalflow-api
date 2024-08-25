import { Injectable } from '@nestjs/common';
import { CreatePrazoDto } from './dto/create-prazo.dto';
import { UpdatePrazoDto } from './dto/update-prazo.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PrazosService {
  constructor(private prisma: PrismaService) {}
  create(createPrazoDto: CreatePrazoDto) {
    // return 'This action adds a new prazo';
    return this.prisma.prazo.create({
      data: createPrazoDto,
    });
  }

  findAll() {
    return `This action returns all prazos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prazo`;
  }

  update(id: number, updatePrazoDto: UpdatePrazoDto) {
    return `This action updates a #${id} prazo`;
  }

  remove(id: number) {
    return `This action removes a #${id} prazo`;
  }
}
