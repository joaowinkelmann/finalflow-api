import { Injectable, Dependencies, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import { SignInReturnDto } from './dto/signin-return.dto';
import { PayloadDto } from './dto/payload.dto';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import * as bcrypt from "bcrypt";
import { PrismaService } from 'prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
@Dependencies(UsuariosService, JwtService, PrismaService, MailerService)
export class AuthService {
    constructor(
        private usuariosService: UsuariosService,
        private jwtService: JwtService,
        private prisma: PrismaService,
        private mailerService: MailerService
    ) { }

    /**
     * 
     * @param signInDto
     *  {
     *      email: string,
     *      senha: string
     *  }
     * @returns 
    */
    async signIn(signInDto: SignInDto): Promise<SignInReturnDto> {

        const user = await this.usuariosService.getUsuario(signInDto.email);
        if (!user || await bcrypt.compare(signInDto.senha, user.senha) === false) {
            throw new UnauthorizedException("Usuário ou senha incorreta");
        }
        const payload: PayloadDto = { sub: user.id_usuario, email: user.email, nivel_acesso: user.nivel_acesso };

        // atualiza o primeiro_acesso no banco
        await this.usuariosService.expiraPrimeiroAcesso(user.id_usuario);

        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                idusuario: user.id_usuario,
                nome: user.nome,
                email: user.email,
                nivel_acesso: user.nivel_acesso,
                primeiro_acesso: user.primeiro_acesso,
                avatar: user.avatar
            }
        };
    }

    // @todo - verificar se vale a pena, parece ser uma mao de implementar no front
    // @link https://www.treinaweb.com.br/blog/autenticacao-refresh-token-com-nestjs

    // async gerarToken(payload: PayloadDto) {
    //     const accessToken = this.jwtService.sign(
    //       { email: payload.email },
    //       {
    //         secret: process.env.JWT_SECRET,
    //         expiresIn: '60s',
    //       },
    //     );

    //     const refreshToken = this.jwtService.sign(
    //       { email: payload.email },
    //       {
    //         secret: process.env.JWT_SECRET,
    //         expiresIn: '120s',
    //       },
    //     );
    //     return { access_token: accessToken, refresh_token: refreshToken };
    //   }


    /**
     * Sends a recovery password for a user with the given email.
     *
     * @deprecated - Usar agora o método setRecoveryToken, utilizando token e tokenExpiresAt.
     * @param email - The email of the user requesting the recovery password.
     * @returns void
     */
    async receiveRecoveryPassword(email: RecoverPasswordDto): Promise<void> {
        setTimeout(async () => {
            try {
                let novaSenha = this.usuariosService.generatePassword(12);
                await this.usuariosService.setPassword(email.email, novaSenha, true);
            } catch (error) {
                console.error(error);
            }
        }, 0);
    }

    /**
     * Seta o token de recuperação de senha para o usuário com o email fornecido.
     * 
     * @param email - O email do usuário que está solicitando a recuperação de senha.
     * @param token - O token de recuperação de senha.
     * @param expiresIn - O tempo, em minutos, até o token expirar.
     * @returns void
     */
    async setRecoveryToken(email: string, token: string, expiresIn: number) {
        // Envia resposta imediatamente, ocultando o processo de atualização
        const user = await this.prisma.usuario.findUnique({
            where: { email },
        });

        if (!user) {
            return {
                message: "Token de recuperação enviado para o e-mail cadastrado, caso exista.",
            };
        }

        // Calcula a data de expiração com base nos minutos fornecidos
        const tokenExpiresAt = new Date(Date.now() + expiresIn * 60000); // 60000 ms = 1 minuto

        (async () => {
            await this.prisma.usuario.update({
                where: { email },
                data: {
                    token_recuperacao: token,
                    token_expiracao: tokenExpiresAt,
                },
            });
        })();

        // Resposta enviada instantaneamente
        return {
            message: "Token de recuperação enviado para o e-mail cadastrado, caso exista.",
        };
    }

    // dai usa esse cara aqui para validar o token que recebeu
    async getUserByRecoveryToken(token: string) {
        return this.prisma.usuario.findFirst({
            where: {
                token_recuperacao: token,
            },
        });
    }

    async sendRecoveryEmail(email: string, token: string) {
        const user = await this.prisma.usuario.findUnique({
            where: { email },
        });

        if (user) {
            (async () => {
                await this.mailerService.sendMail({
                    to: user.email,
                    subject: `Recuperação de Senha: ${user.nome}`,
                    template: "recovery-token",
                    context: {
                        nome: user.nome,
                        email: user.email,
                        token: token,
                        link: `${process.env.FRONTEND_URL}/recovery/${token}`,
                    },
                });
            })();
        }
    }
}