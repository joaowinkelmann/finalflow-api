import { Injectable } from "@nestjs/common";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { PrismaService } from "../../prisma/prisma.service";
import { MailerService } from "@nestjs-modules/mailer";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsuariosService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<any> {
    try {
      const userExists = await this.prisma.usuario.findUnique({
        where: {
          email: createUsuarioDto.email,
        },
      });

      if (userExists) {
        return {
          message: "Usuário já existe",
        };
      }

      const salt = await bcrypt.genSalt();

      // cria uma senha aleatória caso não tenha sido informada
      let senhaPrimeiroAcesso = crypto.getRandomValues(new Uint32Array(1))[0].toString(36) + "bA1_";

      const hash = await bcrypt.hash(senhaPrimeiroAcesso, salt);

      const user = await this.prisma.usuario.create({
        data: {
          nome: createUsuarioDto.nome,
          email: createUsuarioDto.email,
          senha: hash,
          nivel_acesso: createUsuarioDto.nivel_acesso,
        },
      });

      // Enviar e-mail após criar o usuario
      await this.mailerService.sendMail({
        to: user?.email,
        subject: `Primeiro Acesso Ao Site: ${user?.nome}`,
        template: "sign-up",
        context: {
          nome: user?.nome,
          email: user?.email,
          senha: senhaPrimeiroAcesso,
        },
      });

      return {
        id: user.id,
        nome: user.nome,
        email: user.email,
        nivel_acesso: user.nivel_acesso,
      };
    } catch (error) {
      return {
        message: error,
      }
    }
  }
  async findAll() {
    return await this.prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        nivel_acesso: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.usuario.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        nivel_acesso: true,
        // senha: true, // comparar com a senha enviada, mas nao expor
      },
    });
  }

  /**
   * Metodo para retornar o usuario inteiro, usando internamente para realizar o login
   * @param email
   * @returns
   */
  async getUsuario(email: string) {
    return await this.prisma.usuario.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        nivel_acesso: true,
        senha: true,
        primeiro_acesso: true,
        avatar: true,
      },
    });
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    try {
      const user = await this.prisma.usuario.update({
        where: {
          id,
        },
        data: {
          nome: updateUsuarioDto.nome,
          email: updateUsuarioDto.email,
          // nivel_acesso: updateUsuarioDto.nivel_acesso, // nao atualiza o nivel de acesso
        },
      });

      return {
        id: user.id,
        nome: user.nome,
        email: user.email,
        nivel_acesso: user.nivel_acesso,
      };
    } catch (error) {
      return error.message;
    }
  }

  /**
   * Define a propriedade `primeiro_acesso` de um usuário com o `id` especificado para `false`.
   * 
   * @param id - id do usuário
   * @returns A promise that resolves with the updated user object, or an error message if an error occurs.
   */
  async expiraPrimeiroAcesso(id: string) {
    try {
      await this.prisma.usuario.update({
        where: {
          id,
        },
        data: {
          primeiro_acesso: false,
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.usuario.delete({
        where: {
          id,
        },
      });

      return {
        message: "Usuário removido com sucesso",
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }
}
