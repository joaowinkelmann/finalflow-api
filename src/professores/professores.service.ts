import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Professor } from './entities/professor.entity';

@Injectable()
export class ProfessoresService {
  constructor(
    private prisma: PrismaService,
    private usuariosService: UsuariosService
  ) { }

  async create(createProfessorDto: CreateProfessorDto) {
    const usuario = await this.usuariosService.create({
      nome: createProfessorDto.nome,
      email: createProfessorDto.email,
      nivel_acesso: 'professor',
    });

    if (!usuario || !usuario.id) {
      throw new BadRequestException('Falha ao criar usuário: dados inválidos');
    }

    const professorData = {
      departamento: createProfessorDto.departamento,
      usuario: {
        connect: {
          id: usuario.id
        }
      }
    };

    const professor = await this.prisma.professor.create({
      data: professorData,
      include: {
        usuario: true
      }
    });

    return professor;
  }

  async findAll() {
    return await this.prisma.professor.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.professor.findUnique({
      where: {
        id_professor: id
      }
    });
  }

  // getProfessorById(id_professor: string): Promise<Professor | null> {
  getProfessorById(id_professor: string): Promise<any> {
    return this.prisma.professor.findUnique({
      where: {
        id_professor: id_professor
      }
    });
  }

  update(id: string, updateProfessorDto: UpdateProfessorDto) {
    return `This action updates a #${id} professore`;
  }

  remove(id: string) {
    return `This action removes a #${id} professore`;
  }
}
