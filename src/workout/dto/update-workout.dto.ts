import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Level } from '../entities/workout.entity';

export class UpdateWorkoutDto {
  @IsString()
  name?: string;

  @IsString()
  description?: string;

  @IsNumber()
  duration?: number;

  @IsEnum(Level)
  level?: Level;
}
