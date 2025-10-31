import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PaginationDto } from 'src/common/pagination.dto';

@Injectable()
export class WorkoutService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWorkoutDto: CreateWorkoutDto, userId: number) {
    try {
      const workout = await this.prisma.workout.create({
        data: {
          name: createWorkoutDto.name,
          description: createWorkoutDto.description,
          level: createWorkoutDto.level,
          duration: createWorkoutDto.duration,
          user: {
            connect: { id: userId },
          },
        },
      });

      return { message: 'Treino criado!', workout };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Erro interno de servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async listAll(paginationDto: PaginationDto) {
    try {
      const { limit = 10, page = 1 } = paginationDto;
      const skip = (page - 1) * limit;

      const workouts = await this.prisma.workout.findMany({
        take: limit,
        skip: skip,
        orderBy: { createdAt: 'asc' },
        include: { exercises: true },
      });
      const total = await this.prisma.workout.count();
      const totalPages = Math.ceil(total / limit);

      return {
        data: workouts,
        pagination: {
          total, // número total de treinos
          totalPages, // total de páginas disponíveis
          currentPage: page, // página atual
          limit, // quantidade de registros por página
        },
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Erro interno de servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async listOne(id: number, userId: number) {
    try {
      const workout = await this.prisma.workout.findFirst({
        where: {
          id: id,
        },
        include: {
          exercises: true,
        },
      });

      if (!workout) {
        throw new HttpException('Treino não encontrado.', HttpStatus.NOT_FOUND);
      }

      if (workout.userId !== userId) {
        throw new HttpException(
          'Acesso negado: você não pode editar este treino.',
          HttpStatus.UNAUTHORIZED,
        );
      }

      return workout;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Erro interno de servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number, userId: number) {
    try {
      const workout = await this.prisma.workout.findFirst({
        where: {
          id: id,
        },
      });

      if (!workout) {
        throw new HttpException('Treino não encontrado.', HttpStatus.NOT_FOUND);
      }

      console.log({
        treinoUserId: workout.userId,
        usuarioDoToken: userId,
      });

      if (workout.userId !== userId) {
        throw new HttpException(
          'Acesso negado: você não pode editar este treino.',
          HttpStatus.UNAUTHORIZED,
        );
      }

      await this.prisma.workout.delete({
        where: {
          id: workout.id,
        },
      });

      return { message: 'Treino deletado' };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Erro interno de servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateWorkoutDto: UpdateWorkoutDto, userId: number) {
    try {
      const workout = await this.prisma.workout.findFirst({
        where: {
          id: id,
        },
      });

      if (!workout) {
        throw new HttpException('Treino não encontrado.', HttpStatus.NOT_FOUND);
      }

      if (workout.userId !== userId) {
        throw new HttpException(
          'Acesso negado: você não pode editar este treino.',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const updatedWorkout = await this.prisma.workout.update({
        where: { id: workout.id },
        data: {
          name: updateWorkoutDto.name ?? workout.name,
          description: updateWorkoutDto.description ?? workout.description,
          level: updateWorkoutDto.level ?? workout.level,
          duration: updateWorkoutDto.duration ?? workout.duration,
        },
      });

      return { message: 'Treino atualizado com sucesso.', updatedWorkout };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Erro interno de servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
