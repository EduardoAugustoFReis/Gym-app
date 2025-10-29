import { Exercises } from 'src/exercises/entities/exercise.entity';

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

  exercises?: Exercises; // Relacionamento 1:N
}
