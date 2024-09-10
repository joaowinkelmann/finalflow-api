import { Injectable, Dependencies, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import { SignInReturnDto } from './dto/signin-return.dto';
import { PayloadDto } from './dto/payload.dto';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import * as bcrypt from "bcrypt";

@Injectable()
@Dependencies(UsuariosService, JwtService)
export class AuthService {
    constructor(
        private usuariosService: UsuariosService,
        private jwtService: JwtService,
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
     * Receives a recovery password request for a user with the given email.
     * 
     * @param email - The email of the user requesting the recovery password.
     * @returns string - A message indicating that the recovery password was sent to the email.
     */
    async receiveRecoveryPassword(email: RecoverPasswordDto): Promise<any> {
        try {
            let novaSenha = this.usuariosService.generatePassword(12);
            await this.usuariosService.setPassword(email.email, novaSenha, true);
        } catch (error) {
            console.error(error);
            await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 1000) + 2800));
        } finally {
            return {
                message: "Nova senha enviada para o e-mail cadastrado, caso exista"
            };
        }
    }
}