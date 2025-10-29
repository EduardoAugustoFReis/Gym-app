import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { WorkoutModule } from 'src/workout/workout.module';
import { ExercisesModule } from 'src/exercises/exercises.module';

@Module({
  imports: [PrismaModule, WorkoutModule, ExercisesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
