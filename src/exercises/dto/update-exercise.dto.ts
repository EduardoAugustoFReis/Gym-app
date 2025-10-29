/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateExerciseDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
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
}
