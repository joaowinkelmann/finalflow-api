import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professor } from './professor.entity/professor.entity';

@Injectable()
export class ProfessoresService {
  constructor(
    @InjectRepository(Professor)
    private readonly ProfessorsRepository: Repository<Professor>,
  ) {}

  async findAll(): Promise<Professor[]> {
    return await this.ProfessorsRepository.find();
  }
}
