import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
//   signIn(@Body() signInDto: Record<string, any>) {
  signIn(@Body() signInDto: SignInDto) {
    // return this.authService.signIn(signInDto.email, signInDto.senha);
    return this.authService.signIn(signInDto);
  }
}