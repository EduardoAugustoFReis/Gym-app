import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashService } from 'src/common/hash/hash.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await this.hashService.hashPassword(
        createUserDto.password,
      );

      const newUser = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return { message: 'Usuário criado', newUser };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Erro interno de servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async listAll() {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return users;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Erro interno de servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async listOne(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Erro interno de servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }

      await this.prisma.user.delete({
        where: {
          id: user.id,
        },
      });

      return { message: 'Usuário deletado com sucesso' };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Erro interno de servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }

      // só gera um novo hash se o usuário enviar uma nova senha
      let newPassword = user.password;
      if (updateUserDto.password) {
        newPassword = await this.hashService.hashPassword(
          updateUserDto.password,
        );
      }

      const updatedUser = await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: updateUserDto.name ?? user.name,
          email: updateUserDto.email ?? user.email,
          password: newPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return { message: 'Usuário atualizado', updatedUser };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Erro interno de servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
