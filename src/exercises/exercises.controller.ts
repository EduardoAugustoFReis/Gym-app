import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get()
  listAllExercises() {
    return this.exercisesService.findAll();
  }

  @Get(':id')
  listOneExercise(@Param('id', ParseIntPipe) id: number) {
    return this.exercisesService.findOne(id);
  }

  @Post(':workoutId')
  createExercise(
    @Param('workoutId', ParseIntPipe) workoutId: number,
    @Body() createExercise: CreateExerciseDto,
  ) {
    return this.exercisesService.create(createExercise, workoutId);
  }

  @Delete(':id')
  deleteExercise(@Param('id', ParseIntPipe) id: number) {
    return this.exercisesService.delete(id);
  }

  @Patch(':id')
  updateExercise(@Param('id', ParseIntPipe) id: number) {
    return this.exercisesService.update(id);
  }
}
