/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  equipment?: string;

  @IsInt()
  @IsOptional()
  reps?: number;

  @IsInt()
  @IsOptional()
  sets?: number;

  @IsNumber()
  @IsOptional()
  duration?: number;

  @IsInt()
  @IsNotEmpty()
  workoutId: number;
}
