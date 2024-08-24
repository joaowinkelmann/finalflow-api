import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { IS_PUBLIC_KEY } from './public.decorator';
import { NIVEISACESSO_KEY } from './niveisacesso.decorator';
import { NivelAcesso } from '@prisma/client';

// Todas as rotas requerem Bearer token, a nao ser que seja especificado que nao seja o caso através de @Public.
// O nivel de acesso de cada rota é verificado através de @NiveisAcesso

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    // libera rota publica
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    // libera rota publica

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

      // verifica o nivel de acesso da rota que ta tentando acessar
      const requiredNiveisAcesso = this.reflector.getAllAndOverride<NivelAcesso[]>(NIVEISACESSO_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);Request
      if (requiredNiveisAcesso) {
        const { user } = request;
        if (!requiredNiveisAcesso.some((nivelacesso) => user.nivel_acesso?.includes(nivelacesso))) {
          throw new UnauthorizedException("Operação não permitida");
        }
      }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers['authorization'];
  
    if (!authHeader) {
      return undefined;
    }
  
    const [type, token] = authHeader.split(' ');
  
    return type === 'Bearer' ? token : undefined;
  }
}