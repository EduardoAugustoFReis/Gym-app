import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PaginationDto } from 'src/common/pagination.dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get()
  listAllExercises(@Query() paginationDto: PaginationDto) {
    return this.exercisesService.findAll(paginationDto);
  }

  @Get(':id')
  listOneExercise(@Param('id', ParseIntPipe) id: number) {
    return this.exercisesService.findOne(id);
  }

  @Post('workout/:workoutId')
  createExercise(
    @Param('workoutId', ParseIntPipe) workoutId: number,
    @Body() createExerciseDto: CreateExerciseDto,
  ) {
    return this.exercisesService.create(workoutId, createExerciseDto);
  }

  @Delete(':id')
  deleteExercise(@Param('id', ParseIntPipe) id: number) {
    return this.exercisesService.delete(id);
  }

  @Patch(':id/workout/:workoutId')
  updateExercise(
    @Param('id', ParseIntPipe) id: number,
    @Param('workoutId', ParseIntPipe) workoutId: number,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    return this.exercisesService.update(id, workoutId, updateExerciseDto);
  }
}
