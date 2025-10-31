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
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PaginationDto } from 'src/common/pagination.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import type { RequestWithUser } from 'src/common/interfaces/request-with-user';

@Controller('workouts')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createWorkout(
    @Body() createWorkoutDto: CreateWorkoutDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.sub;
    return this.workoutService.create(createWorkoutDto, userId);
  }

  @Get()
  listAllWorkout(@Query() paginationDto: PaginationDto) {
    return this.workoutService.listAll(paginationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  listOneWorkout(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.sub;
    return this.workoutService.listOne(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteWorkout(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.sub;
    return this.workoutService.delete(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateWorkout(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.sub;
    return this.workoutService.update(id, updateWorkoutDto, userId);
  }
}
