import { Exercises } from 'src/exercises/entities/exercise.entity';
import { User } from 'src/user/entities/user.entity';

export enum Level {
  BEGINNER = 'BEGINNER',
  INTERMEDIARY = 'INTERMEDIARY',
  ADVANCE = 'ADVANCE',
}

export class Workout {
  id: number;
  name: string;
  description: string;
  duration: number; // em minutos

  level: Level;

  createdAt: string;
  updatedAt: string;

  user?: User;
  exercises?: Exercises[]; // Relacionamento 1:N
}
