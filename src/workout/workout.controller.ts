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
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PaginationDto } from 'src/common/pagination.dto';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post()
  createWorkout(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutService.create(createWorkoutDto);
  }

  @Get()
  listAllWorkout(@Query() paginationDto: PaginationDto) {
    return this.workoutService.listAll(paginationDto);
  }

  @Get(':id')
  listOneWorkout(@Param('id', ParseIntPipe) id: number) {
    return this.workoutService.listOne(id);
  }

  @Delete(':id')
  deleteWorkout(@Param('id', ParseIntPipe) id: number) {
    return this.workoutService.delete(id);
  }

  @Patch(':id')
  updateWorkout(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
  ) {
    return this.workoutService.update(id, updateWorkoutDto);
  }
}
