import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { PrismaService } from "../../prisma/prisma.service";
import { MailerService } from "@nestjs-modules/mailer";
import * as bcrypt from "bcrypt";
import * as sharp from 'sharp';
import { SetAvatarDto } from "./dto/set-avatar.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { EditUsuarioDto } from "./dto/edit-usuario.dto";
import { NivelAcesso } from "@prisma/client";
import { Professor } from "src/professores/entities/professor.entity";
import { Aluno } from "src/alunos/entities/aluno.entity";

@Injectable()
export class UsuariosService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<any> {
    try {
      const userExists = await this.prisma.usuario.findUnique({
        where: {
          email: createUsuarioDto.email,
        },
      });

      if (userExists) {
        throw new ConflictException("Um usuário com o mesmo e-mail já existe");
      }

      const salt = await bcrypt.genSalt();
      const firstAccessPassword = this.generatePassword(12);

      const hash = await bcrypt.hash(firstAccessPassword, salt);

      const user = await this.prisma.usuario.create({
        data: {
          nome: createUsuarioDto.nome,
          email: createUsuarioDto.email,
          senha: hash,
          nivel_acesso: createUsuarioDto.nivel_acesso,
        },
      });

      // Enviar e-mail após criar o usuario
      this.mailerService.sendMail({
        to: user?.email,
        subject: `Primeiro Acesso Ao Site: ${user?.nome}`,
        template: "sign-up",
        context: {
          nome: user?.nome,
          email: user?.email,
          senha: firstAccessPassword,
        },
      });

      return {
        idusuario: user.id_usuario,
        nome: user.nome,
        email: user.email,
        nivel_acesso: user.nivel_acesso,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public generatePassword(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array); // alta entropia hehe

    let password = '';
    for (let i = 0; i < length; i++) {
      password += characters[array[i] % characters.length];
    }

    return password;
  }

  async findAll() {
    return await this.prisma.usuario.findMany({
      select: {
        id_usuario: true,
        nome: true,
        email: true,
        nivel_acesso: true,
      },
    });
  }

  async findOne(id: string) {
    const usuario =  await this.prisma.usuario.findUnique({
      where: {
        id_usuario: id,
      },
      select: {
        id_usuario: true,
        nome: true,
        email: true,
        nivel_acesso: true,
        // senha: true, // comparar com a senha enviada, mas nao expor
      },
    });

    if(usuario == null){
      throw new NotFoundException("Usuario não encontrado!");
    }

    return usuario;
  }

  async getMyData(id: string, nivelacesso: NivelAcesso) {  
    return await this.prisma.usuario.findUnique({
      where: {
        id_usuario: id,
      },
      select: {
        id_usuario: true,
        nome: true,
        email: true,
        nivel_acesso: true,
        primeiro_acesso: true,
        avatar: true,
        ...(nivelacesso === NivelAcesso.professor && {
          Professor: {
            select: {
              departamento: true,
            },
          },
        }),
        ...(nivelacesso === NivelAcesso.aluno && {
          Aluno: {
            select: {
              Curso: {
                select: {
                  nome: true,
                  id_curso: true,
                },
              },
            },
          },
        }),
        ...(nivelacesso === NivelAcesso.coordenador && {
          Coordenador: {
            select: {
              departamento: true,
            },
          },
        }),
      },
    });
  }

  async editMyData(id: string, editUsuarioDto: EditUsuarioDto) {
    try {

       // otimizar o avatar, caso ele esteja chegando por aqui também
       if (editUsuarioDto.avatar.length > 0) {
        const buffer = Buffer.from(editUsuarioDto.avatar, 'base64');
    
        // Resize and convert the image to webp format
        const resizedImageBuffer = await sharp(buffer)
          .resize(96, 96)
          .flatten()
          .webp({ quality: 65 })
          .toBuffer();
    
        // Passa o MIME type da imagem
        const resizedImageBase64 = `data:image/webp;base64,${resizedImageBuffer.toString('base64')}`;
        editUsuarioDto.avatar = resizedImageBase64;
      }

      const user = await this.prisma.usuario.update({
        where: {
          id_usuario: id,
        },
        data: {
          nome: editUsuarioDto.nome,
          avatar: editUsuarioDto.avatar
        },
      });

      return {
        idusuario: user.id_usuario,
        nome: user.nome,
        email: user.email,
        nivel_acesso: user.nivel_acesso,
        avatar: user.avatar,
      };
    } catch (error) {
      return error.message;
    }
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
        id_usuario: true,
        nome: true,
        email: true,
        senha: true,
        nivel_acesso: true,
        primeiro_acesso: true,
        avatar: true,
      },
    });
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    try {
      const user = await this.prisma.usuario.update({
        where: {
          id_usuario: id,
        },
        data: {
          nome: updateUsuarioDto.nome,
          email: updateUsuarioDto.email,
          // nivel_acesso: updateUsuarioDto.nivel_acesso, // nao atualiza o nivel de acesso
        },
      });

      return {
        idusuario: user.id_usuario,
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
          id_usuario: id,
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
          id_usuario: id,
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

  async uploadAvatar(avatar: SetAvatarDto, userId: string) {
    try {
      const buffer = Buffer.from(avatar.base64data, 'base64');
  
      // Resize and convert the image to webp format
      const resizedImageBuffer = await sharp(buffer)
        .resize(96, 96)
        .flatten()
        .webp({ quality: 65 })
        .toBuffer();
  
      // Passa o MIME type da imagem
      const resizedImageBase64 = `data:image/webp;base64,${resizedImageBuffer.toString('base64')}`;
  
      // Update the user record in the database
      return await this.prisma.usuario.update({
        where: { id_usuario: userId },
        data: { avatar: resizedImageBase64 },
        select: { avatar: true },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException("Erro ao atualizar o avatar");
    }
  }


  // @todo - criar uma coluna "senha_temporaria" para armazenar a senha temporaria, se o cara estiver rodando um script pra recuperar um monte de usuarios, ele nao sobreescreve a senha atual do cara
  // nao pode setar diretamente no campo senha, pois ele vai criptografar a senha temporaria e sobreescrever a senha atual
  /**
   * 
   * @param email 
   * @param senha 
   * @param recovery - If a recovery email should be sent
   * @returns 
   */
  async setPassword(email: string, password: string, recovery: boolean): Promise<any> {
    try {

      const user = await this.prisma.usuario.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        // sleep for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return {
          message: "Usuário não encontrado",
        };
      }

      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);

      await this.prisma.usuario.update({
        where: {
          email,
        },
        data: {
          senha: hash,
          primeiro_acesso: true,
        },
      });

      if (recovery) {
        // Se for uma redefinição de senha, envia e-mail
        this.mailerService.sendMail({
          to: user.email,
          subject: `Recuperação de Senha: ${user.nome}`,
          template: "recovery-password",
          context: {
            nome: user.nome,
            email: user.email,
            senha: password,
          },
        });
      }

      return {
        message: "Senha atualizada com sucesso",
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  /**
   * Troca a senha de um usuario que já está logado
   * @param changePasswordDto 
   * @param sub 
   */
  async changePassword(changePasswordDto: ChangePasswordDto, idusuario: any) {
    const user = await this.prisma.usuario.findUnique({
      where: {
        id_usuario: idusuario,
      },
    });

    if (!user) {
      throw new InternalServerErrorException("Usuário inválido");
    }

    // Verifica se a senha atual está correta
    const isPasswordCorrect = await bcrypt.compare(changePasswordDto.senhaold, user.senha);
    if (!isPasswordCorrect) {
      throw new BadRequestException("Senha atual incorreta");
    }

    return await this.setPassword(user.email, changePasswordDto.senha, false);
  }
}
