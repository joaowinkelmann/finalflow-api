import { Injectable } from '@nestjs/common';
import { CreateCronogramaDto } from './dto/create-cronograma.dto';
import { UpdateCronogramaDto } from './dto/update-cronograma.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CronogramasService {
  constructor(private prisma: PrismaService) {}
  create(createCronogramaDto: CreateCronogramaDto, idusuario: string) {
    // return 'This action adds a new cronograma';
    return this.prisma.cronograma.create({
      data: createCronogramaDto,
    });
  }

  findAll() {
    return `This action returns all cronogramas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cronograma`;
  }

  update(id: number, updateCronogramaDto: UpdateCronogramaDto) {
    return `This action updates a #${id} cronograma`;
  }

  remove(id: number) {
    return `This action removes a #${id} cronograma`;
  }
}
