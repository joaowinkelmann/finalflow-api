import { Injectable, Dependencies, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { SignInDto } from './dto/signin.dto';

import { isEmail, IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

@Injectable()
// @Dependencies(UsersService)
// @Dependencies(UsuariosService)
@Dependencies(UsuariosService, JwtService)
export class AuthService {
    constructor(
        private usuariosService: UsuariosService,
        private jwtService: JwtService
    ) { }

    //   async signIn(email: string, pass: string) {
    //     const user = await this.usuariosService.getUsuario(email);
    //     if (user?.senha !== pass) {
    //       throw new UnauthorizedException();
    //     }
    //     // const { password, ...result } = user;
    //     const { senha, ...result } = user;
    //     // TODO: Generate a JWT and return it here
    //     // instead of the user object
    //     return result;
    //   }

    /**
     * 
     * @param email - Email do usuario
     * @param pass - Senha do usuario
     * @returns 
    */
    // async signIn(
    //     email: string,
    //     pass: string,
    // ): Promise<{ access_token: string }> {
    async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {

        const user = await this.usuariosService.getUsuario(signInDto.email);
        // if (user?.senha !== signInDto.senha) {
        if (!user || await bcrypt.compare(signInDto.senha, user.senha) === false) {
            throw new UnauthorizedException();
        }
        // const payload = { sub: user.id, username: user.email };
        const payload = { sub: user.id, nome: user.nome, email: user.email };
        console.log('payload', payload);
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}