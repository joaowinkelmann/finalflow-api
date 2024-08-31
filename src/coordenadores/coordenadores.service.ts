import { ConflictException, ForbiddenException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { TransferCoordenadorDto } from './dto/transfer-coordenador.dto';
import { UpdateCoordenadorDto } from './dto/update-coordenador.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { ProfessoresService } from 'src/professores/professores.service';
import { CreateCoordenadorDto } from './dto/create-coordenador.dto';
import { NiveisAcesso } from 'src/auth/niveisacesso.decorator';
import { NivelAcesso } from '@prisma/client';

@Injectable()
export class CoordenadoresService {
  
  private ambienteInicializado: boolean = false;

  constructor(
    private prisma: PrismaService,
    private usuariosService: UsuariosService,
    private professoresService: ProfessoresService
  ) { }

  async init(createCoordenadorDto: CreateCoordenadorDto) {

    if (this.ambienteInicializado) {
      throw new ConflictException('Ambiente já inicializado');
    }

    // verificar se de fato não existe nenhum coordenador ainda
    // na real, somente deixa criar um coordenador se não existir nenhum usuario ainda no ambiente
    // const usuario = await this.prisma.usuario.findFirst();
    const coordenador = await this.prisma.coordenador.findFirst();

    // se ja tem algum usuario ou coordenador, não deixa criar dai
    // if (usuario || coordenador) {
    if (coordenador) {
      this.ambienteInicializado = true;
      throw new ConflictException('Ambiente já inicializado');
    }

    createCoordenadorDto.nivel_acesso = 'coordenador';

    // cria o usuario e depois o coordenador
    const adminUser = await this.usuariosService.create(createCoordenadorDto);

    // vincular o usuario ao coordenador
    return await this.prisma.coordenador.create({
      data: {
        idUsuario: adminUser.id
      }
    });
  }

  async transfer(transferCoordenadorDto: TransferCoordenadorDto, idusuario: string) {
    // não existe "criar" um coordenador, mas sim, passar a tocha adiante (isso é, caso exista um coordenador)
    // caso ainda não exista um coordenador (ambiente zerado), o primeiro pode ser cadastrado dai

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
        // departamento: transferCoordenadorDto.departamento,
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

  async findOne(idusuario: string) {
    // return `This action returns a #${id} professore`;

    // console.log(idusuario);
    // console.log('id', id);
    return await this.prisma.coordenador.findUnique({
      where: {
        idUsuario: idusuario
      }
    });
  }

  update(id: string, updateCoordenadorDto: UpdateCoordenadorDto) {
    return `This action updates a #${id} professore`;
  }

  remove(id: string) {
    return `This action removes a #${id} professore`;
  }
}
