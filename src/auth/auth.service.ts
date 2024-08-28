import { Injectable, Dependencies, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

import { SignInDto } from './dto/signin.dto';
import { SignInReturnDto } from './dto/signin-return.dto';
import { PayloadDto } from './dto/payload.dto';
import { RecoverPasswordDto } from './dto/recover-password.dto';

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
            throw new UnauthorizedException();
        }
        const payload: PayloadDto = { sub: user.id, email: user.email, nivel_acesso: user.nivel_acesso };

        // atualiza o primeiro_acesso no banco
        await this.usuariosService.expiraPrimeiroAcesso(user.id);

        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                id: user.id,
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
     * @returns A promise that resolves to an object with a message indicating the result of the operation.
     */
    async receiveRecoveryPassword(email: RecoverPasswordDto): Promise<any> {
        try {
            // Gerar nova senha
            let novaSenha = crypto.getRandomValues(new Uint32Array(1))[0].toString(36) + "bA1_";
            await this.usuariosService.updatePassword(email.email, novaSenha, true);

            return {
                message: "Nova senha enviada para o e-mail cadastrado, caso exista",
            };
        } catch (error) {
            console.error(error);
            return {
                message: "Nova senha enviada para o e-mail cadastrado, caso exista", // nao informa pro cara que o email nao existe
            };
        }
    }
}