import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCursoDto } from "./dto/create-curso.dto";
import { UpdateCursoDto } from "./dto/update-curso.dto";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class CursosService {
  constructor(private prisma: PrismaService) { }

  async create(createCursoDto: CreateCursoDto) {
    try {
      return await this.prisma.curso.create({
        data: createCursoDto,
      });
    } catch (error) {
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

  async findStudents(id: string) {
    try {
      const cursos = await this.prisma.curso.findUnique({
        where: {
          id_curso: id,
        },
        include: {
          Aluno: {
            select: {
              id_aluno: true,
              matricula: true,
              idusuario: true,
              idcurso: true,
            },
          },
        },
      });

      // Retorna diretamente a resposta
      return cursos;
    } catch (error) {
      return { error: error.message };
    }
  }

  async update(id: string, updateCursoDto: UpdateCursoDto) {
    return await this.prisma.curso.update({
      where: { id_curso: id },
      data: updateCursoDto,
    }).catch((error) => {
      console.log(error);
      throw new NotFoundException("Curso não encontrado");
    });
  }

  async remove(id: string) {
    return await this.prisma.curso.delete({
      where: { id_curso: id },
    }).catch((error) => {
      console.log(error);
      throw new NotFoundException("Curso não encontrado");
    });
  }
}
