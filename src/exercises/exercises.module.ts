import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WorkoutModule } from 'src/workout/workout.module';

@Module({
  imports: [PrismaModule, WorkoutModule],
  controllers: [ExercisesController],
  providers: [ExercisesService],
  exports: [ExercisesService],
})
export class ExercisesModule {}
