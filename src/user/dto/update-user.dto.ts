import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password?: string;
}
