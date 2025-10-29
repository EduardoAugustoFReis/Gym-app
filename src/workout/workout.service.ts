import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Injectable()
export class WorkoutService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWorkoutDto: CreateWorkoutDto) {
    try {
      const workout = await this.prisma.workout.create({
        data: {
          name: createWorkoutDto.name,
          description: createWorkoutDto.description,
          level: createWorkoutDto.level,
          duration: createWorkoutDto.duration,
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

  async listAll() {
    try {
      const workout = await this.prisma.workout.findMany();

      return workout;
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
      const workout = await this.prisma.workout.findFirst({
        where: {
          id: id,
        },
      });

      if (!workout) {
        throw new HttpException('Treino não encontrado.', HttpStatus.NOT_FOUND);
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

  async delete(id: number) {
    try {
      const workout = await this.prisma.workout.findFirst({
        where: {
          id: id,
        },
      });

      if (!workout) {
        throw new HttpException('Treino não encontrado.', HttpStatus.NOT_FOUND);
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

  async update(id: number, updateWorkoutDto: UpdateWorkoutDto) {
    try {
      const workout = await this.prisma.workout.findFirst({
        where: {
          id: id,
        },
      });

      if (!workout) {
        throw new HttpException('Treino não encontrado.', HttpStatus.NOT_FOUND);
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
