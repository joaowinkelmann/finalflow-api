import { Controller, Get } from '@nestjs/common';
import { AlunosService } from './alunos.service';
// import { Alunos } from './interfaces/alunos.interface';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Get()
  async getAllAlunos(): Promise<any> {
    return this.alunosService.getAllAlunos();
  }
}