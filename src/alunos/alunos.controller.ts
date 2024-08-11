import { Controller, Get } from '@nestjs/common';
import { AlunosService } from './alunos.service';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Get()
  async findAll() {
    return this.alunosService.findAll();
  }
}
