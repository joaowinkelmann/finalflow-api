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


  // fica pra v2/testes... esse cara aqui ta certo dai, usando token e pa
  @Public()
  @Post('/recoverNew')
  async recoverPasswordNew(@Body() recoverPasswordDto: RecoverPasswordDto) {
    // cria um token de 16 caracteres de recuperação
    const token = crypto.getRandomValues(new Uint8Array(8)).join("");

    const tokenExpiresAt = new Date();
    tokenExpiresAt.setHours(tokenExpiresAt.getHours() + 1); // expira em 1 hora
  
    await this.authService.setRecoveryToken(recoverPasswordDto.email, token, tokenExpiresAt);

    await this.authService.sendRecoveryEmail(recoverPasswordDto.email, token);
  
    return {
      message: "Se o e-mail estiver cadastrado, um link de recuperação será enviado.",
    };
  }

}