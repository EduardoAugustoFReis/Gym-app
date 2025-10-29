/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Level } from '../entities/workout.entity';

export class CreateWorkoutDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  duration: number;

  @IsEnum(Level)
  level: Level;
}
