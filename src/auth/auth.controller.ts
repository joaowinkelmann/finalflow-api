import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { Public } from './public.decorator';
import { RecoverPasswordDto } from './dto/recover-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('/login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @Post('/recover')
  recoverPassword(@Body() recoverPasswordDto: RecoverPasswordDto) {
    this.authService.receiveRecoveryPassword(recoverPasswordDto);
    return {
      message: "Nova senha enviada para o e-mail cadastrado, caso exista"
    };
  }

  /**
 * Gera um token aleatório usando letras maiúsculas e números.
 * 
 * @param length - O tamanho do token gerado.
 * @returns string - O token gerado.
 */
  private generateRandomToken(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);

    array.forEach(value => {
      token += characters[value % characters.length];
    });

    return token;
  }


  @Public()
  @Post('/recoverNew')
  async recoverPasswordNew(@Body() recoverPasswordDto: RecoverPasswordDto) {
    // cria um token de 12 caracteres de recuperação
    const token = this.generateRandomToken(12);

    const tokenExpiresIn = 15; // 15 minutos

    await this.authService.setRecoveryToken(recoverPasswordDto.email, token, tokenExpiresIn);

    await this.authService.sendRecoveryEmail(recoverPasswordDto.email, token);

    return {
      message: "Se o e-mail estiver cadastrado, um link de recuperação será enviado.",
    };
  }
}