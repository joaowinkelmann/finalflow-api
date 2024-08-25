import { Injectable, Dependencies, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

import { SignInDto } from './dto/signin.dto';
import { SignInReturnDto } from './dto/signin-return.dto';
import { PayloadDto } from './dto/payload.dto';

@Injectable()
@Dependencies(UsuariosService, JwtService)
export class AuthService {
    constructor(
        private usuariosService: UsuariosService,
        private jwtService: JwtService
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
}