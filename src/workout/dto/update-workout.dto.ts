import { CreateWorkoutDto } from './create-workout.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateWorkoutDto extends PartialType(CreateWorkoutDto) {}
