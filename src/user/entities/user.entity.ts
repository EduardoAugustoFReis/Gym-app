import { Workout } from 'src/workout/entities/workout.entity';

export class User {
  id: number;
  name: string;
  email: string;
  password: string;

  workouts: Workout[];
}
