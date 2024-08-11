import { Controller, Get } from '@nestjs/common';
import { ProfessoresService } from './professores.service';

@Controller('professores')
export class ProfessoresController {
  constructor(private readonly professoresService: ProfessoresService) {}

  @Get()
  async findAll() {
    return this.professoresService.findAll();
  }
}
