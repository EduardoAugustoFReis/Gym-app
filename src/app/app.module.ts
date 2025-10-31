import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { WorkoutModule } from 'src/workout/workout.module';
import { ExercisesModule } from 'src/exercises/exercises.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    PrismaModule,
    WorkoutModule,
    ExercisesModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
