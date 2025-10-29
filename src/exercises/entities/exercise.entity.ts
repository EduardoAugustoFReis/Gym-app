import { Workout } from 'src/workout/entities/workout.entity';

export class Exercises {
  id: number;
  name: string;
  description?: string;
  equipment?: string;
  reps?: number;
  sets?: number;
  duration?: number; // em minutos
  workoutId: number;

  workout?: Workout;

  createdAt: Date;
  updatedAt: Date;
}
