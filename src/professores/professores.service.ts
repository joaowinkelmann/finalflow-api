import { BadRequestException, Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { NivelAcesso } from '@prisma/client';

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
      nivel_acesso: NivelAcesso.professor
    });

    if (!usuario || !usuario.id_usuario) {
      throw new BadRequestException('Falha ao criar usuário: dados inválidos');
    }

    const professorData = {
      departamento: createProfessorDto.departamento,
      usuario: {
        connect: {
          id_usuario: usuario.id_usuario
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
    const professores =  await this.prisma.professor.findMany();

    if(professores == null){
      throw new NotAcceptableException('Nenhum professor cadastrado');
    }

    return professores;
  }

  async findOne(id: string) {
    const professor =  await this.prisma.professor.findUnique({
      where: {
        id_professor: id
      }
    });

    if(professor == null){
      throw new NotAcceptableException('Por favor informe um id válido');
    }

    return professor;
  }

  // getProfessorById(id_professor: string): Promise<Professor | null> {
  async getProfessorById(id_professor: string): Promise<any> {
    const  professor =  await this.prisma.professor.findUnique({
      where: {
        id_professor: id_professor
      }
    });

    if(professor == null){
      throw new NotAcceptableException('Por favor informe um id válido');
    }

    return professor;
  }

  async update(id: string, updateProfessorDto: UpdateProfessorDto) {
    const retorno = await this.prisma.professor.update({
      where: {
        id_professor: id
      },
      data: {
        departamento: updateProfessorDto.departamento
      }
    })

    if(retorno == null){
      throw new NotAcceptableException('Por favor informe um id válido');
    }

    return {
      message: "Sucesso ao atualizar o departamento",
    };
  }

  async remove(id: string) {
    const temProfessor = await this.prisma.professor.findFirst({
      where: {
        id_professor: id
      }
    })
    if(temProfessor == null){
      throw new NotAcceptableException('Por favor informe um id válido');
    }

    const temOrientacao = await this.prisma.orientacao.findFirst({
      where: {
        idprofessor: id
      }
    })

    if(temOrientacao != null){
      throw new NotAcceptableException('Professor já presente em uma orientação, não é possível exclui-lo');
    }

    await this.prisma.professor.delete({
      where: {
        id_professor: id
      }
    });

    return {
      message: "Professor removido com sucesso",
    };
  }
}
