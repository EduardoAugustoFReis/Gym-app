import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HashService } from 'src/common/hash/hash.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SessionDto } from './dto/session-create.dto';
import { JwtService } from '@nestjs/jwt';

interface JwtPayload {
  sub: number;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(sessionDto: SessionDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: sessionDto.email,
        },
      });

      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }

      // validar a senha
      const passwordIsValid = await this.hashService.comparePassword(
        sessionDto.password,
        user.password,
      );

      if (!passwordIsValid) {
        throw new HttpException(
          'E-mail e(ou) senha incorretos.',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const payload: JwtPayload = { sub: user.id, email: user.email };
      const token = this.jwtService.sign(payload);

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Erro interno de servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
