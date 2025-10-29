import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { WorkoutService } from 'src/workout/workout.service';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly workoutService: WorkoutService,
  ) {}

  async findAll() {
    try {
      const exercises = await this.prisma.exercise.findMany();

      return exercises;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Erro interno de servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const exercise = await this.prisma.exercise.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          description: true,
          equipment: true,
          reps: true,
          sets: true,
          duration: true,
          workoutId: true,
        },
      });

      if (!exercise) {
        throw new HttpException(
          'Exercício não encontrado.',
          HttpStatus.NOT_FOUND,
        );
      }

      return exercise;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Erro interno de servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(workoutId: number, createExerciseDto: CreateExerciseDto) {
    try {
      const workout = await this.prisma.workout.findUnique({
        where: {
          id: workoutId,
        },
      });

      if (!workout) {
        throw new HttpException('Treino não encontrado.', HttpStatus.NOT_FOUND);
      }

      const newExercise = await this.prisma.exercise.create({
        data: {
          name: createExerciseDto.name,
          description: createExerciseDto.description,
          equipment: createExerciseDto.equipment,
          reps: createExerciseDto.reps,
          sets: createExerciseDto.sets,
          duration: createExerciseDto.duration,
          workoutId: workout.id,
        },
      });

      return { message: 'Exercício criado com sucesso.', newExercise };
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
      const exercise = await this.prisma.exercise.findUnique({
        where: {
          id: id,
        },
      });

      if (!exercise) {
        throw new HttpException(
          'Exercício não encontrado.',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prisma.exercise.delete({
        where: {
          id: exercise.id,
        },
      });

      return { message: 'Treino deletado com sucesso.' };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Erro interno de servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    workoutId: number,
    updateExerciseDto: UpdateExerciseDto,
  ) {
    try {
      const workout = await this.prisma.workout.findUnique({
        where: {
          id: workoutId,
        },
      });

      if (!workout) {
        throw new HttpException('Treino não encontrado.', HttpStatus.NOT_FOUND);
      }

      const exercise = await this.prisma.exercise.findUnique({
        where: {
          id: id,
        },
      });

      if (!exercise) {
        throw new HttpException(
          'Exercício não encontrado.',
          HttpStatus.NOT_FOUND,
        );
      }

      const updatedExercise = await this.prisma.exercise.update({
        where: {
          id: exercise.id,
        },
        data: {
          name: updateExerciseDto.name ?? exercise.name,
          description: updateExerciseDto.description ?? exercise.description,
          equipment: updateExerciseDto.equipment ?? exercise.equipment,
          reps: updateExerciseDto.reps ?? exercise.reps,
          sets: updateExerciseDto.sets ?? exercise.sets,
          duration: updateExerciseDto.duration ?? exercise.duration,
          workoutId: workout.id,
        },
      });

      return { message: 'Exercício atualizado', updatedExercise };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Erro interno de servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
