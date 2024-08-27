import { Injectable } from '@nestjs/common';
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
    try {
      const usuario = await this.usuariosService.create({
        nome: createProfessorDto.nome,
        email: createProfessorDto.email,
        nivel_acesso: 'professor',
      });

      if (!usuario) {
        console.error('Erro ao criar usuário');
        throw new Error('Erro ao criar usuário');
      }

      const professor = await this.prisma.professor.create({
        data: {
          departamento: createProfessorDto.departamento,
          usuario: {
            connect: {
              id: usuario.id
            }
          }
        }
      });

      return professor;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  async findAll() {
    // return `This action returns all professores`;
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
