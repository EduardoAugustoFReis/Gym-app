import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ExercisesModule } from 'src/exercises/exercises.module';

@Module({
  imports: [PrismaModule, ExercisesModule],
  controllers: [WorkoutController],
  providers: [WorkoutService],
})
export class WorkoutModule {}
