import { ConflictException, ForbiddenException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { TransferCoordenadorDto } from './dto/transfer-coordenador.dto';
import { UpdateCoordenadorDto } from './dto/update-coordenador.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { ProfessoresService } from 'src/professores/professores.service';

@Injectable()
export class CoordenadoresService {
  constructor(
    private prisma: PrismaService,
    private usuariosService: UsuariosService,
    private professoresService: ProfessoresService
  ) { }

  async transfer(transferCoordenadorDto: TransferCoordenadorDto, idusuario: string) {
    // não existe "criar" um coordenador, mas sim, passar a tocha adiante

    // pra isso, devemos então assegurar que quem está acessando esse endpoint é um coordenador, e que o usuário que está
    // recebendo o cargo é um professor.
    // quem faz a transferência, deixa na hora de ser o coordenador.

    // admite somente um coordenador, sendo o cargo máximo dentro do sistema.

    // verifica se quem está recebendo o cargo é um professor

    const professor = await this.professoresService.getProfessorById(transferCoordenadorDto.idProfessorNovoCoordenador);

    if (!professor) {
      throw new NotFoundException('Professor não encontrado');
    }

    // verifica se o professor já é coordenador
    const coordenador = await this.prisma.coordenador.findUnique({
      where: {
        idUsuario: professor.idUsuario
      }
    });

    if (coordenador) {
      throw new ConflictException('Professor já é coordenador');
    }

    // verifica se o professor que está transferindo o cargo é um coordenador
    const coordenaLogado = await this.prisma.coordenador.findUnique({
      where: {
        idUsuario: idusuario
      }
    });

    if (!coordenaLogado) {
      throw new ForbiddenException('Usuário não é coordenador');
    }

    // transfere o cargo para o professor, caso dê certo, rebaixa o coordenador atual
    const novoCoordenador = await this.prisma.coordenador.create({
      data: {
        departamento: transferCoordenadorDto.departamento,
        idUsuario: professor.idUsuario
      }
    });

    if (!novoCoordenador) {
      throw new UnprocessableEntityException('Erro ao transferir cargo');
    }

    // criou o novo coordenador, agora rebaixa o antigo
    await this.prisma.coordenador.delete({
      where: {
        idUsuario: idusuario
      }
    });

    await this.prisma.usuario.update({
      where: {
        id: idusuario
      },
      data: {
        nivel_acesso: 'professor'
      }
    });

    return novoCoordenador;
  }

  findAll() {
    return `This action returns all professores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} professore`;
  }

  update(id: number, updateCoordenadorDto: UpdateCoordenadorDto) {
    return `This action updates a #${id} professore`;
  }

  remove(id: number) {
    return `This action removes a #${id} professore`;
  }
}
